Bayes Test
===================
Don't get excited nothing to see here, really. Feel free to remove at any point.

Bayes Test application in NodeJS for representation of academic confidence

Very slow, I know.

[Live Here](http://bayes.herokuapp.com/)

I've removed all the modules for pushes my end

    npm install

will address that

    username: root
    password: toor

should get you in.
After which there's not much else you can do.

Just a rough. Template for working in.

Development
========================================
TODOS

    Actual confidence rating part
    Finish responsiveness
    ^ when I'm satisfied that scope creep won't mess with that.
    Style media queries properly (only static width devices supported)
    Compress / Replace images.. Too slow loading
    Move profiles over to REST API
    Sign Up
    Finish Edit User Data
    Server-side validation for the above
    A LOT OF OTHER STUFF


Extent of this so far is limited to sessions, log in and out, profiles. Though most of this is very limited.

It's documented as best as I could at this early hour.

Need the full data dictionary / schema to actually progress with the application's primary purpose. I suspect Gary may provide that soon? Until then I'll continue to improve on this, no doubt.

Until then. Enjoy.

Documentation
========================================
API Routes
----------
|Route	                |   HTTP Verb	    |        Description               | State
------------------------|------------------ |----------------------------------|
|/api/		            |   GET	            |        API Root			       |DONE
|/api/login             |   POST            | Posts username+password for auth |DONE
|/api/logout            |   GET             |  Destroys current session data   |DONE
|/api/user/:username    |   GET             | Serve user data for profiles     | TODO
|/api/edit/user         |   POST            | Posts new user credentials to DB |Partial


Database
----------
