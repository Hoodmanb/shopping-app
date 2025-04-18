### Authentication

## login, signup and logout are handled on the frontend, but authentication are verified on the backend using an idtoken provided by firebase from the frontend for all api routes.

## signup
# seller, buyer, worker, admin

# seller
- expected data = email (verifiable) , password, brand-name, profile-pics
# ui for seller data after signup
- expected data = phone number(verifiable), location
# subscription ui - prepaid (monthly, yearly)

# buyer
- expected data - email (verifiable) , password, displayname, profile-pics
# ui for buyer data after signup
- userInfo - phone number, location

# services
- expected data = email (verifiable), password, brand-name, profile-pics
# ui for services data after signup
- phone number, location, services-type(e.g food delivery), years active
# subscription ui - prepaid (monthly, yearly)-->

## login
# all
- expected data - email, password

### Api Routes

### note that all api endpoint would be sent with the idtoken generated by firebase client for authentication on the backend

## admin api routes

- DELETE /api/admin/delete - delete a user and all data attached to the user    (userId {success, error})
* POST /api/admin/create - make a user admin (userId, {success, error})
* POST api/admin/suspend - suspend a user account (userId. {success, error})
* POST api/admin/unsuspend - unsuspend a user (userId, {success, error})
- POST api/admin/users - get all users list
- POST api/admin/user - get a user and all data attached to that user

## transaction api routes
* POST /api/paystack/initialize (email, amount, products object, {response      obj, error})
* POST /api/paystack/verify (transaction reference, {verification obj, error})


## users api routes
- DELETE api/user/delete - delete a user account
- POST api/user/subscribe - make a subscription
- POST api/user/unsubscribe - unsubscribe

## products api routes
# available to seller and admin
- GET /api/brand-name/products - gets all products owned by this seller         (brand-name, {products object, error})
* POST /api/product - creates a poduct (name, description, price, stock,        images )
* PUT /api/product/id - modifies the contents of the product (modified data,    {success, error})
* DELETE /api/product/id - delete the product with the specified id (id,        {success, error})
- POST /api/chat - live chat
- GET /api/chat - get chat data ( if not stored locally)

# available to all users
* GET /api/products - get the list of all products
* GET /api/product/id - get the product with the specified id (peoduct id,      {product object, error})

## chart api routes
# available to all users
* GET /api/chart - get the full chart list 
* POST /api/chart - creates a chart
* DELETE /api/chart/item/id - delete the item in the chart with this id (item   id, {success, error})
* PUT /api/chart/id - modifies the item in the chart with this id (chart id, {   success, error})
* DELETE /api/charts - delete a chart and it entire item



### app routes
## available to all users
- /dashboard
- /auth/login (traditional,  google)
- /auth/signup  (traditional,  google)
- /products/brand-name
- /product/id
- /chart
- /chart/id
- /payment
- /services
- /contact
- /contact/chat
- /profile
- /checkout
- /order tracking

### subscription plans ( available to sellers only)
## pay-as-you-go
- there is a deduction fee for every purchase

## prepaid
- sellers are allowed to make monthly/ yearly subscription
- vip promo/hot sales subscription

### Ui/Ux
## requirements
# all users
- chatting interface is made available to aid live mesages between seller=buyer, seller=admin buyer=admin
- a interface that contain all existing products
- interface to edit profile data (data inserted during signup)
- ui for paymemt confirmation/rejection
- chart ui
- ui for a specific product ( includes full product details)
- checkout ui
- transaction history
- order confirmation ui


# sellers
- should be able to make subscription
- an admin dashboard is made available, it would contain all products owned by the seller
- there is an interface for making CRUD operations on products
- payment interface (subscription)
- ui for updating other status
- ui to set delivery cost based on location (can be set on signup)
- ui for posting promo/ hot sales

# buyer
- an interface to make ratings of products
- payment interface (purchase)
- ui for tracking order
- ui to chose delivery location (manually or through default phone gps app)
- ui to report an issue
- ui to request a product by giving image(s) and description of the product

# admin
- able to suspend/ block user account
- ui for transaction statistics 
- ui to send email to specific/all users
- transaction history (all users)

### prefered theme is dark
