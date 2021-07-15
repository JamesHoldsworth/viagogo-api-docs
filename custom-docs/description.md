# Overview

The official viagogo API v2 connects your website or application with the
world's largest ticket marketplace. Your application can use the API to search
for and view events, purchase tickets for an event or list tickets on the
viagogo platform.

## Quick Reference

All API access is over HTTPS, and accessed from the `api.viagogo.net` domain.
Request and response payloads are formatted as `application/hal+json`, which is
basically just plain old JSON with hyperlinks (see [Media Type](#media-type)).
We support [cross-origin resource sharing][cors] to allow you to interact
securely with our API from a client-side web application. [OAuth2][oauth2]
is used for all authentication. All API requests must be authenticated or you
will receive a `401 Unauthorized` error response (see
[Authentication](#authentication)).

[cors]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
[oauth2]: http://oauth.net/2/

> Libraries are [available in several languages](#section/Overview/Libraries).

> **API Root Endpoint:** `https://api.viagogo.net/v2`

## Explorable API

The viagogo API v2 is an explorable API that uses hyperlinks to guide
applications between resources. As such, all resources have `_links` properties
so that proper API clients don't need to construct URLs on their own.

One of the main advantages of using hyperlinks is that API responses are able to
better describe the current state of a resource by using links to represent the
possible actions available on that resource. This should reduce (or hopefully
remove) the need for your applications to implement logic for managing the
various states of a resource.

### Media Type

The API uses [Hypertext Application Language (HAL)][hal] to hyperlink between
resources. HAL is a simple format that provides a set of conventions for
expressing hyperlinks in JSON - it's basically just plain old JSON with
hyperlinks!

[hal]: http://stateless.co/hal_specification.html

All viagogo API resources are represented using the `application/hal+json`
media type. The following properties can be expected on every resource:

* `_links` - a JSON object containing a set of hyperlinks to other resources
* `_embedded` - a JSON object containing other resources embedded inside the current resource
* The regular properties of the resource

### Root endpoint

You can issue a `GET` request to the root endpoint to get a resource with
hyperlinks to all the main resources in the API.

`GET https://api.viagogo.net/v2`

## Libraries

Use the viagogo API in your favourite language with one of our API libraries.
Use the official GogoKit library, or choose between any of the available third
party libraries.

### GogoKit

* C# - [gogokit.net](https://github.com/viagogo/gogokit.net)
* Ruby - [gogokit.rb](https://github.com/viagogo/gogokit.rb)
* PHP - [gogokit.php](https://github.com/viagogo/gogokit.php)
* Python - [gogokit.py](https://github.com/viagogo/gogokit.py)

## Sandbox Environment

viagogo API v2 is supported in two environments. You can use our *sandbox*
environment for testing purposes, before moving to the *production*. Use your
sandbox credentials to make calls to the sandbox environment. When you're set
to go live, use your production credentials to make calls to the production
environment.

* Sandbox API v2 root endpoint: `https://sandbox.api.viagogo.net/v2`
* Sandbox OAuth2 token endpoint: `https://sandbox.account.viagogo.com/oauth2/token`

## HTTP Methods

Where possible, API v2 strives to use appropriate [HTTP methods][httpmethods]
for each action.

[httpmethods]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

| **Method** | **Description** |
| ---------- | --------------- |
| `GET` | Used for retrieving resources. |
| `POST` | Used for creating resources. |
| `PATCH` | Used for updating resources with partial JSON data. |
| `PUT` | Used for replacing resources. |
| `DELETE` | Used for deleting resources. |

## HTTP Status Codes

API v2 attempts to return appropriate [HTTP status codes][httpstatuscodes] for
every request.

[httpstatuscodes]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes

| **Code** | **Description** |
| -------- | --------------- |
| `200 OK` | Success! |
| `201 Created` | The request succeeded and resulted in a new resource being created. The Location header of the response contains the URI of the new resource. |
| `202 Accepted` | The request has been accepted for processing, but processing has not been completed. |
| `204 No Content` | The request succeeded but the server is not returning any content. This is the response for most DELETE requests. |
| `400 Bad Request` | The request was invalid or cannot be otherwise served. An accompanying error message will explain further. |
| `401 Unauthorized` | Authentication credentials were missing or incorrect. |
| `403 Forbidden` | The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why. |
| `404 Not Found` | The URI requested is invalid or the resource requested, such as an event, does not exist. |
| `405 Method Not Allowed` | A request was made of a resource using a request method not supported by that resource. |
| `409 Conflict` | The request could not be processed because of a conflict change in the request, such as an edit conflict in the case of multiple updates. |
| `429 Too Many Requests` | The client sent too many requests in a given amount of time and has been rate-limited. |
| `500 Internal Server Error` | Something is broken. Please email [support](#) so that the viagogo team can investigate. |

## Error Responses

When the viagogo API returns error messages, it includes a specific error code
and possibly a localized error message that can be displayed to a user.

An error may look like this:

```json
{
  "code": "validation_failed",
  "message": null,
  "errors": {
    "address.postal_code": [
      "Zip Code is invalid"
    ]
  }
}
```

### Error Codes

| **Code** | **Status Code** | **Description** |
| -------- | --------------- | --------------- |
| `https_required` | `400` | The request is not using an SSL connection. |
| `user_agent_required` | `400` | The request does not include a valid User-Agent header. |
| `invalid_request_body` | `400` | This request does not include a valid JSON body. |
| `insufficient_scope` | `403` | The access token used in the request does not have the scope required to access this resource. |
| `validation_failed` | `400` | The request data is not valid. `errors` will contain an object with a localized message that describes the validation error for each property of the data. |
| `invalid_purchase_action` | `403` | The request is attempting perform an operation on a [`Purchase`](#purchase) that does not currently support that action. |
| `purchase_not_allowed` | `403` | The request is attempting to purchase tickets that cannot be purchased. |
| `listing_conflict` | `409` | The request is attempting to purchase tickets that have been modified or are no longer available. |
| `purchase_still_processing` | `500` | There was an error while purchasing the tickets but we are still processing the order. |
| `invalid_seller_listing_action` | `403` | The request is attempting perform an operation on a [`SellerListing`](#sellerlisting) that does not currently support that action. |
| `create_listing_not_allowed` | `403` | The request is attempting create a listing for an [`Event`](#event) that tickets cannot currently be listed for. |
| `invalid_delete` | `403` | The request is attempting to delete a resource that cannot be deleted. |
| `internal_server_error` | `500` | Something is broken. Please contact [support](#) |

## Pagination

Requests that return multiple results will be paginated to 100 items by default.
You can use the `page` parameter to specify which page of data to retrieve. You
can use `page_size` parameter to set custom page sizes on the API responses. API
responses return pre-built pagination links with rels `first`, `prev`, `next`
and `last` and client applications are encouraged to follow these links for
pagination.

`GET https://api.viagogo.net/v2/addresses?page=1&page_size=30`

Note that page numbering is 1-based and that omitting the `page` parameter will
return the first page.

## Sorting

Paginated results can be sorted according to one of more criteria using the
`sort` param. Clients can specify sort criteria as a comma-separated list of the
names of fields that should be used to sort. The default sort order is ascending
but a *-* prefix on any sort field specifies a descending sort order.

`GET https://api.viagogo.net/v2/categories/4402/events?sort=start_date,-ticket_price`

The example request above sorts results by `start_date` ascending and then by
`ticket_price` descending.

## Sparse Fieldsets

Your application can request for the API to return only specific fields in the
response on a per-type basis by including a `fields`[TYPE] parameter. The value
of the `fields` parameter must be a comma-separated list of the name(s) of the
field(s) to be returned.

`GET https://api.viagogo.net/v2/events/4695621?fields=id,name,_embedded&fields[venue]=city`

The example request above includes the `id`, `name` and `_embedded` fields in
the event resource and the `city` field in its embedded venue.

## Localization

viagogo API v2 supports various request headers to return locale-specific
content in responses.

### Accept-Language Header

The `Accept-Language` header can be used to determine the language of the API
response content (e.g. event names and error messages). Content will be returned
in English if no `Accept-Language` header is provided, or viagogo does not
currently support the requested language codes.

`Accept-Language: da, en-gb;q=0.8, en;q=0.7`

In the example header above, the request is specifying "I prefer Danish, but
will accept British English and other types of English." See more information
about the [Accept-Language header][acceptlang].

[acceptlang]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4

### Accept-Currency Header

The `Accept-Currency` header can be used to determine the currency of responses
that include monetary values. For example, [Listing](#listing) resources have a
`ticket_display_price` property that gives the price-per-ticket in the currency
requested by the application. The value of the `Accept-Currency` header should
be a three-letter currency code as defined by [ISO 4217][iso4217].

[iso4217]: http://en.wikipedia.org/wiki/ISO_4217

`Accept-Currency: eur`

In the example above, the request is specifying that it would like to receive
monetary values in Euros where possible.

### VGG-Country Header

Applications can include the `VGG-Country` header to change the
geography-context of requests. Each domain of the viagogo website is referred to
as a _geography_ that has its own category-structure and language, currency and
content defaults. The value of the `VGG-Country` header should be a two-letter
country code as defined by [ISO 3166][iso3166]. If an application does not
provide a `VGG-Country` header then the API will default to the _US_ geography
(www.viagogo.com).

[iso3166]: http://en.wikipedia.org/wiki/ISO_3166-1

`VGG-Country: FR`

In the example above, the application is specifying that it would like make
requests in the French geography (as if the client were using the www.viagogo.fr
website).

## HTTP Caching

### Cache-Control Header

Most responses return a `Cache-Control` header with a `max-age` value that
indicates the number of seconds your application can cache a particular response
for. You don't need to request a resource any more frequently than every
`max-age` seconds.

### E-Tag Header

All responses return the `ETag` header. You can use the value of this header to
make subsequent requests to those resources using the `If-None-Match` header.
If the resource has not changed, the server will return a `304 Not Modified`
response with an empty body.

## Resource Changes

API v2 makes it simple to request only the data that has changed since a
previous request made by your application. This functionality is particularly
useful for applications that are storing API response data in a database and can
help any application to reduce the number of requests required to retrieve
viagogo data.

### 1. Check whether the resource supports the `updated_since` query parameter

Only certain resources such as [`Category`](#operation/Categories_GetChildren),
[`Event`](#operation/Events_GetCategoryEvents),
[`SellerListing`](#operation/SellerListings_GetSellerListings) and
[`Sale`](#operation/Sales_GetSales) resources support requesting data changes.
Check the endpoint documentation to see whether the resource can be filtered
with `updated_since`.

### 2. Request the resource filtered by `updated_since`

Request the resources you are interested in with the [`updated_since`] query
parameter set to a timestamp representing the time frame that you care
about. This will cause the resources returned in the `items` property of the
response to be ordered by the time they were last updated (the oldest resource
will be first). The `deleted_items` property will contain items that have been
deleted within the same time frame.

### 3. Follow the `next` link to get resources that have changed since your last request

With the items sorted by the time they were updated, the `next` link in the
response will always represent a request for resources that have changed since
your last request.


## Idempotent Requests

To safely retry an API request without accidently performing the same operation
twice, you can attach a unique key to any `POST` request via the
`Idempotency-Key: <key>` header.

For example, if a request to
[`create a listing`](#operation/SellerListings_CreateListing) fails due to a
network connection error, you can retry the request with the same key to
guarantee that only a single listing is created.

The key can be any UUID value and the viagogo API will always send back the same
response for requests made with the same key. Keys expire after 24 hours.


[//]: # (-----------------------------)


# Announcements

Important announcements that relate to the usage of the viagogo api. We will
announce upcoming changes that could effect you. Theses could be new features
or deprecations of old features. We will link to these announcements with
corresponding notifications to your registered email addresses.

## TLS v1.0 Deprecation Notice [June 30, 2018]

viagogo will be disabling support for TLS v1.0 on our public facing api. We are
providing advanced notice so that our customers and partners can prepare
accordingly. If you are using unsupported clients to connect to the viagogo API
after disabling TLS v1.0, you will begin receiving connection error messages.
