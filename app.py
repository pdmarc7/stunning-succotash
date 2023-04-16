from flask import Flask, render_template, session, url_for, redirect, request, jsonify, flash, get_flashed_messages
from os import urandom

import db, datetime
from app_settings import APP_NAME, APP_JUMBOTRON

app = Flask(__name__)
app.secret_key = "525516f011b6efc3383af250254faa8d5c00dfca2779e94e74ef3498d6baa6b1"


@app.route('/')
def blog():
    session["APP_JUMBOTRON"] = APP_JUMBOTRON
    session["APP_NAME"] = APP_NAME
        
    blog_posts = db.get_blog_posts(APP_NAME)
    return render_template('blog.html', blogPostsListObj=blog_posts)


@app.route("/blog/<blog_post_id>")
def read_blog(blog_post_id):
    blog_post = db.get_post_by_id(blog_post_id)
    return render_template('blog-post.html', blogPostObj=blog_post, blogPostTitle=blog_post["title"])


@app.route("/comment/<blog_post_id>")
def comment(blog_post_id):
    blog_post = db.get_post_by_id(blog_post_id)
    return render_template('comment.html', blogPostObj=blog_post)


@app.route("/post-comment", methods=["POST"])
def post_comment():
    blog_post = db.get_post_by_id(request.form["postId"])

    if request.method == "POST":
        comment_object =  {
            "commentId": urandom(18).hex(),
            "postId": request.form["postId"],
            "userId": session["userId"],
            "comment": request.form["comment"],
            "datePublished": datetime.datetime.utcnow().strftime("%B %d, %Y %H:%M:%S")
        }

        db.save_post_comment(comment_object)
        return render_template("comment-success.html", postId=request.form["postId"])


@app.route("/create-post", methods=["POST", "GET"])
def create_post():
    if request.method == "POST":
        post_object =  {
            "postId": urandom(18).hex(),
            "appName": APP_NAME,
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
        return render_template("create-post-success.html")
    return render_template("create-post.html")


@app.route('/flash_messages')
def get_flash_messages():
    messages = []

    for message in get_flashed_messages():
        messages.append(message)

    return jsonify({"messages": messages})


# Define a route for the 404 error page
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

