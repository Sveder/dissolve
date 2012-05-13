#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
from google.appengine.api import channel
from google.appengine.ext.webapp import template
import cgi

import logging


class MainHandler(webapp2.RequestHandler):
    def get(self):
        token = channel.create_channel("moo")
        template_values = {'token': token}
        
        rendered = template.render('index.html', template_values)
        self.response.out.write(rendered)

class MooHandler(webapp2.RequestHandler):
    def post(self):
        channel.send_message("moo", "1234")

app = webapp2.WSGIApplication([('/', MainHandler), ("/moo", MooHandler)], debug=True)

