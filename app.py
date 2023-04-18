from flask import Flask, render_template, session, url_for, redirect, request, jsonify, flash, get_flashed_messages
from os import urandom

import db, datetime

from itsdangerous import URLSafeSerializer
from app_settings import app_id

import os

APP_SECRET_KEY = "6d092d27a1e2cb0fc472ad8cdfdbf70ed147c3d37efea92ea7f7a4feb49201e6b330705ad0a0dc9fab76841cf662b450a2104cdf789cf175db29fbf4ffd2fdb6989a1c46c2167e9039b56f489ceabaad789183fa31dfe1245efa9869e3f47f91438858ccf88fdc17677e52f5cd61e8fa05f98dc861b6f5f7a721878fca1bc03a37a74b367e1810e361fa3e19fc1e9746bc4850e6247b"

APP_AUTHORIZATION_KEY="379221810a887577970d8396a48dd7a6136a41fcdaf7706b6488fa1d8c180123e889c2341c3f9d3a5bea4162fc06982a9f661eb2f57e80cb227aab50c5f21bdd3cc447e2ce2449ed4719d4c0c0f3f39c8437567f08305d4851fefb4ba18be7d1c2d70b6d78aa67cad02b71b748315542073a810f67bdd93608934a27b2468a572fbcbd7d51e3328f2310cf7559e81d47ca597f3a78d524684cee3014cbb0595899d6fc4854b7cea1aa3fa036470d6abb3f0759ec83c74eeef9d626c986a8f5542615df8a128e51304483baf75a3b536bb63a5dd986c87fb1473dce336613c13f93ddec19bc7d6eee74c9317c4feeb9948ae784bd9f6b2be10940dd2774e47fabfdd797d21b834c8675cf6e5183825637c63233c207db6cd8b5359614f68f4e952d1e2e2907de578bfdd05fbf8b28dcaeb04506df04d376111f76c091723b6fdb1b83635cb9e01e055161d289002c00c4c456e78be3d2efc01c3e24ec3771427aa1835477c57c98cf51f75379bc94151205c22695102dc6f3b6aabc27f3caf30348a15f58940862225f9d05ce839641512ad9341c351c9841a57ceac36336ace85a7c3495632ea3eb5f3bfe70026f4cb5cab41482cc878126856a0c08d5b607e9d1b7f2e819ee39a450bb52ef1188241a5c8ba4322acd75c3a63b43316b85650a30ab4faef1ac6933504060791fe62088165a2f58"


app = Flask(__name__)
app.secret_key = APP_SECRET_KEY

def verify_authorization_key(authorization_key):
    return authorization_key == APP_AUTHORIZATION_KEY

@app.route('/')
def blog():
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    blog_posts = db.get_blog_posts(app_id)
    return render_template('blog.html', 
        blogPostsListObj=blog_posts, 
        APP_NAME=APP_NAME, 
        APP_JUMBOTRON=APP_JUMBOTRON,
        APP_TITLE=APP_TITLE,
        APP_SUBTITLE=APP_SUBTITLE
    )


@app.route("/blog/<blog_post_id>")
def read_blog(blog_post_id):
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    blog_post = db.get_post_by_id(blog_post_id)
    return render_template('blog-post.html', blogPostObj=blog_post, blogPostTitle=blog_post["title"], APP_NAME=APP_NAME)


@app.route("/comment/<blog_post_id>")
def comment(blog_post_id):
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    blog_post = db.get_post_by_id(blog_post_id)
    return render_template('comment.html', blogPostObj=blog_post, APP_NAME=APP_NAME)


@app.route("/post-comment", methods=["POST"])
def post_comment():
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    blog_post = db.get_post_by_id(request.form["postId"])

    if request.method == "POST":
        comment_object =  {
            "commentId": urandom(18).hex(),
            "postId": request.form["postId"],
            "firstName": request.form["comment-first-name"],
            "lastName": request.form["comment-last-name"],
            "comment": request.form["comment"],
            "datePublished": datetime.datetime.utcnow().strftime("%B %d, %Y %H:%M:%S")
        }

        db.save_post_comment(comment_object)
        return render_template("comment-success.html", postId=request.form["postId"], APP_NAME=APP_NAME)


@app.route("/create-post", methods=["POST", "GET"])
def create_post():
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)

    if request.method == "POST" and verify_authorization_key(request.form["authorizationKey"]) == True:
        post_object =  {
            "postId": urandom(18).hex(),
            "appId": app_id,
            "title": request.form["title"],
            "primaryImageURL": request.form["primaryImageURL"],
            "photoCredit": request.form["photoCredit"],
            "context": request.form["context"],
            "content": request.form["content"],
            "datePublished": datetime.datetime.utcnow().strftime("%B %d, %Y"),
            "author": request.form["author"],
            "comments": [],
        }

        db.save_blog_post(post_object)
        return render_template("create-post-success.html", APP_NAME=APP_NAME)
    return render_template("create-post.html", APP_NAME=APP_NAME)



@app.route("/about")
def about():
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    #blog_post = db.get_post_by_id(blog_post_id)
    return render_template('about.html', APP_NAME=APP_NAME, APP_JUMBOTRON=APP_JUMBOTRON, APP_ABOUT=APP_ABOUT)


@app.route('/flash_messages')
def get_flash_messages():
    messages = []

    for message in get_flashed_messages():
        messages.append(message)

    return jsonify({"messages": messages})


@app.route("/settings", methods=["POST", "GET"])
def settings():
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)

    if request.method == "GET":
        return render_template('settings.html', APP_NAME=APP_NAME)

    if request.method == "POST":
        if verify_authorization_key(request.form["authorizationKey"]) != True:
            return render_template('settings.html', APP_NAME=APP_NAME)

        for key, value in request.form.items():
            if key != "authoizationKey":
                if len(request.form[key]) > 0:
                    db.update_app_settings(app_id, key, value)

        return redirect(url_for("blog"))


# Define a route for the 404 error page
@app.errorhandler(404)
def page_not_found(error):
    APP_NAME, APP_JUMBOTRON, APP_TITLE, APP_SUBTITLE, APP_ABOUT = db.get_app_settings(app_id)
    return render_template('404.html', APP_NAME=APP_NAME), 404

