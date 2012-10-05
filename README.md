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

You may need to modify `authorizeEndpoint`, `entitlementEndpoint` and 
`apiEndpoint` in `js/manage.js` when your OAuth server is not configured at 
`http://localhost/php-oauth`. So you need to change the following lines:

    var authorizeEndpoint   = 'http://localhost/php-oauth/authorize.php';
    var entitlementEndpoint = 'http://localhost/php-oauth/api.php/resource_owner/entitlement';
    var apiEndpoint         = 'http://localhost/php-oauth-grades-rs/api.php';

To for example:

    var authorizeEndpoint   = 'https://www.example.org/php-oauth/authorize.php';
    var entitlementEndpoint = 'https://www.example.org/php-oauth/api.php/resource_owner/entitlement';
    var apiEndpoint         = 'https://www.example.org/php-oauth-grades-rs/api.php';

## Client Registration
Also, make sure that this client is registered in your OAuth server. The following
information will be relevant:

<table>
  <tr>
    <th>Identifier</th><td>html-view-grades</td>
  </tr>
  <tr>
    <th>Name</th><td>View Grades</td>
  </tr>
  <tr>
    <th>Description</th><td>This application can be used to view your grades.</td>
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
