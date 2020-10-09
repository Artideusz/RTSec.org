---
title: Posts
layout: default
permalink: /posts/
---

# List of posts
{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date }}
    - {{ post.excerpt }}
{% endfor %}