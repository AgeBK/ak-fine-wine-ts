# React + RTK + TypeScript

## About

I built this little mock e-commerce style website from a JSON file I found online which contains retail wine store data with accompanying images. The web site has 35 components and the JSON file for the products is hosted on npoint.io. which contains over 1600 products.

I wrote all of the code (JS/CSS/HTML) myself, none of it has been copied (I use the MUI Autocomplete Component via NPM for the search)

The site uses RTK to share common data, I'm more familiar with Context but wanted to try out RTK. React Router for navigation, I've included a Search bar using MUI Autocomplete. The site also makes use of 2 custom hooks. For styling, it's using Flexbox via CSS modules. The site also includes loading and error components. Responsive design techniques have been taken into account, the site should present nicely on mobile and Desktop. I have used semantic HTML and taken accessibility into consideration. I have extensive lint rules in place as well

Here's a link to the site: <a href="https://ak-fine-wines-ts.netlify.app/">AK Fine Wines</a>

## Features

- Over 1600 products
- Multiple filters (price, rating, variety)
- Sorting (alphabetical, price, on sale items)
- Paging
- Items per page changer
- Search bar
- Shopping Cart
- Responsive carousel

## Pages.

The <b>home</b> page lists some the specials that the site has to offer, similar to what you'd probably see online, it's basically a navigation page/entry point for the other 2 pages.

The <b>category</b> page lists all the products for a particular category of wines depending what URL you come in on. eg: red, white, 10% off and many more. The wines displayed can be filtered, sorted, items per page can be adjusted.

The <b>product</b> page displays all the details about an individual product.

I've built a shopping cart as well which you can add products to, increase and decrease amounts and enter a discount code. The idea being that the user can have a simulated on-line shopping experience.
