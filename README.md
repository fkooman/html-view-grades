# View Grades

## Introduction

This application makes it possible to view student grades together with the 
`php-oauth-grades-rs` project. It uses its API.

## Screenshots

![html-view-grades-student](https://github.com/fkooman/html-view-grades/raw/master/docs/html-view-grades-student-screenshot.png)

![html-view-grades-teacher](https://github.com/fkooman/html-view-grades/raw/master/docs/html-view-grades-teacher-screenshot.png)

## Installation

This application depends on the following components:

* jQuery
* JSrender (JavaScript Template Rendering for jQuery)
* JSO (JavaScript OAuth 2 client)
* Bootstrap CSS

It can easily be installed by running the following script:

    $ sh docs/install_dependencies.sh

This will download the latest version of those components and everything will
immediately work.

## Configuration
You need to configure the application to point to your OAuth server and 
resource server. This can be done by copying `config/config.js.default` to 
`config/config.js` and modifying the `config.js` file to suit your situation.

This is the default configuration:

    var apiClientId        = 'html-view-grades';
    var authorizeEndpoint  = 'http://localhost/php-oauth/authorize.php';
    var attributesEndpoint = 'http://localhost/php-oauth/api.php/resource_owner/attributes';
    var apiEndpoint        = 'http://localhost/php-oauth-grades-rs/api.php';

For example, for your situation it may need to be this:

    var apiClientId        = 'html-view-grades';
    var authorizeEndpoint  = 'https://www.example.org/php-oauth/authorize.php';
    var attributesEndpoint = 'https://www.example.org/php-oauth/api.php/resource_owner/attributes';
    var apiEndpoint        = 'https://www.example.org/php-oauth-grades-rs/api.php';

## Client Registration
Also, make sure that this client is registered in your OAuth server. The following
information will be relevant:

<table>
  <tr>
    <th>Identifier</th><td>html-view-grades</td>
  </tr>
  <tr>
    <th>Name</th><td>View Your Grades</td>
  </tr>
  <tr>
    <th>Description</th><td>Application for students and teachers to view grades.</td>
  </tr>
  <tr>
    <th>Profile</th><td>User-agent-based Application</td>
  </tr>
  <tr>
    <th>Secret</th><td><em>NONE</em></td>
  </tr>
  <tr>
    <th>Redirect URI</th><td>https://www.example.org/html-view-grades/index.html</td>
  </tr>
</table>

That should be all!
