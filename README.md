# React + TypeScript + Vite

## About

I built this little mock e-commerce style website from a JSON file I found online which contains retail wine store data with accompanying images. The JSON file on npoint.io

The site uses RTK to share common data throughout the site, React Router for navigation, I've included a Search bar using MUI auto complete and 33 different components including a container component and 2 custom hooks. For styling, it's using Flexbox via CSS modules. The site also includes loading and error components. Responsive design techniques have been taken into account, the site should present nicely on mobile and Desktop. I have used semantic HTML and taken accessibility into consideration.

The website has 3 main pages.

The home page which lists some the specials that the site has to offer, similar to what you'd probably see online, it's basically a navigation page/entry point for the other 2 pages.

The category page lists all the products for a particular category of wines depending what URL you come in on. eg: red, white, 10% off and many more. The wines displayed can be filtered, sorted, items per page can be adjusted. products can be added to the cart from this page

The product page displays all the details about an individual product. products can be added to the cart from this page

I've built a shopping cart for it as well which you can add products to, increase and decrease amounts and enter a discount code. The idea being that the user can have a simulated on-line shopping experience.
