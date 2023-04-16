from google.cloud import firestore

from operator import itemgetter

import os
import datetime

db = firestore.Client(project='marcello-349916')


def build_query_list(query):
    query_docs = []

    for doc in query.stream():
        query_docs.append(doc.to_dict())
    return query_docs


def reformat_date(date_string):
    datetime_str_format = '%Y-%m-%dT%H:%M:%SZ'
    actual_delivery_time = datetime.datetime.strptime(date_string, datetime_str_format)
 

def save_blog_post(blog_post):
    doc_ref = db.collection('blog-posts').document(blog_post["postId"])
    doc_ref.set(blog_post)


def save_post_comment(comment):
    comments = get_comments(comment["postId"])
    comments.append(comment)

    print(comments)
    update_blog_post(comment["postId"], "comments", comments)


def create_review(review):
    reviews = get_reviews(review["postId"])
    reviews.append(review)
    update_blog_post(review["postId"], "reviews", reviews)

def create_reviewer(user_account):
    if check_reviewer(user_account["email"]) == None:
        doc_ref = db.collection('blog-reviewers').document(user_account["userId"])
        doc_ref.set(user_account)
        return True
    else:
        return False

def check_reviewer(email, password=None):
    doc_ref = db.collection('blog-reviewers')
    if password != None:
        query = doc_ref.where("email", "==", email).where("password", "==", password)
    else:
        query = doc_ref.where("email", "==", email)

    results = build_query_list(query)

    if len(results) > 0:
        return results[0]
    else:
        return None

def check_reviewer_by_id(user_id):
    doc_ref = db.collection('blog-reviewers')
    query = doc_ref.where("userId", "==", user_id)

    results = build_query_list(query)

    if len(results) > 0:
        return results[0]
    else:
        return None

def get_user_by_referral_code(referral_code):
    doc_ref = db.collection('blog-reviewers')
    query = doc_ref.where("referralCode", "==", referral_code)

    results = build_query_list(query)

    if len(results) > 0:
        return results[0]
    else:
        return None


def get_blog_posts(app_name):
    doc_ref = db.collection('blog-posts')
    query = doc_ref.where('appName', '==', app_name)
    results = build_query_list(query)

    if len(results) > 0:
        return results
    else:
        return []


def get_post_by_id(post_id):
    doc_ref = db.collection('blog-posts')
    query = doc_ref.where('postId', '==', post_id)
    results = build_query_list(query)

    if len(results) > 0:
        return results[0]
    else:
        return None

def get_comments(post_id):
    doc_ref = db.collection('blog-posts')
    query = doc_ref.where('postId', '==', post_id)

    results = build_query_list(query)

    if len(results) > 0:
        return results[0]["comments"]
    else:
        return []

def get_reviews(post_id):
    doc_ref = db.collection('blog-posts')
    query = doc_ref.where('postId', '==', post_id)

    results = build_query_list(query)

    if len(results) > 0:
        try:
            return results[0]["reviews"]
        except:
            return []
    else:
        return []


def update_blog_post(post_id, dict_key, value):
    doc_ref = db.collection('blog-posts').document(post_id)
    doc_ref.update({dict_key: value})


def referred_users(referral_code):
    doc_ref = db.collection('blog-reviewers')
    query = doc_ref.where('referredUser', '==', referral_code)

    results = build_query_list(query)

    if len(results) > 0:
        return results
    else:
        return []

