# React + RTK + TypeScript

## About

I built this mock e-commerce style website from a JSON file I found online which contains retail wine store data with accompanying images. The web site has 44 components and the JSON file for the products is hosted on npoint.io. which contains over 1600 products.

Here's a link to preview the site: <a target="_blank" href="https://ak-fine-wines-ts.netlify.app/">AK Fine Wines</a>

Here's a link to the JavaScript version code base: <a target="_blank" href="https://github.com/AgeBK/ak-fine-wines">GitHub</a>

I wrote all of the code (JS/CSS/HTML) myself, none of it has been copied (I used the MUI Autocomplete Component via NPM for the search).

## Description

The site uses RTK to manage the shopping cart, I'm more familiar with Context and think it would have been the more appropriate choice but wanted to try out RTK.
React Router for navigation, I've included a Search bar using MUI Autocomplete. The site also makes use of 2 custom hooks. For styling, it's using Flexbox via CSS modules. The site also includes loading and error components. Responsive design techniques have been taken into account, the site should present nicely on mobile and desktop. I have used semantic HTML, compressed the product images and taken accessibility and SEO into consideration. I have extensive lint rules in place as well.

The site uses npoint.io for the backend which hosts a JSON file with all of the products for the site. The backend functionallity is quite limited, you can either fetch all of your JSON or fetch by index of the product so I just fetch them all and filtering is all done on the front end. Ideally, it would be better to fetch by product id, product category etc.

I've built a shopping cart as well which you can add products to, increase and decrease amounts and enter a discount code. Caluclations are automatically made in the cart for any discounts (2 for $XX, 10 for $100 etc) The idea being that the user can have a simulated on-line shopping experience.

## Features

- Over 1600 products
- Multiple filters (price, rating, variety)
- Dynamic header/blurb on Category page (variety change)
- Sorting (alphabetical, price, on sale items)
- Paging
- Items per page selector
- Search bar (auto complete)
- Shopping cart
- Responsive carousel

## Pages.

The <b>home</b> page lists some the specials that the site has to offer, similar to what you'd probably see online, it's basically a navigation page/entry point for the other 2 pages.

The <b>category</b> page lists all the products for a particular category of wines depending what URL you come in on. eg: red, white, 10% off and many more. The wines displayed can be filtered, sorted, items per page can be adjusted.

The <b>product</b> page displays all the details about an individual product.
