# GraphQL backend for VirtualGrade

This is the backend for Virtual Grade, the integrated online grading platform.

### Introduction

In order to allow for any number of configurations, this package represents
 just one implementation of the backend for VirtualGrade. This package 
 conforms to the as-yet-unpublished design doc for VirtualGrade, and thus
 can be integrated successfully with any frontend implementation.
 
### Features and Details

* Authentication and Authorization with LDAP and JWT
* GraphQL data resolution
* Implemented in HapiJS
* Data persistence using MySQL (configurable using KnexJS)

### To be implemented

* Detailed user management based on LDAP data
* Enhanced permissions model to enable on per-query basis
* Fully implemented design doc (beyond assignments)
* Subscriptions for assignment grading/editing