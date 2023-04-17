from flask import Flask, render_template, session, url_for, redirect, request, jsonify, flash, get_flashed_messages
from os import urandom

import db, datetime

from itsdangerous import URLSafeSerializer
from app_settings import app_id

import os

app = Flask(__name__)
app.secret_key = os.environ["APP_SECRET_KEY"]

def verify_authorization_key(authorization_key):
    return authorization_key == os.environ["APP_AUTHORIZATION_KEY"]

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

