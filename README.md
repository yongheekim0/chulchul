# E-Commerce web app: [ChulChul&copy;](https://chulchul.onrender.com/#/)

## Description

**ChulChul&copy;** is a fully functional E-commerce web application. With a responsive user interface, it allows users to browse through products, add them to their cart, and complete transactions using PayPal.

### Features

- **User Authentication:** Secure user authentication system for account creation, login, and update user profile.

- **Product Catalog:** Browse through a catalog of products with a responsive UI.

- **Shopping Cart:** Add products to your cart, view the cart summary, and easily manage your selected items before checkout.

- **Checkout Process:** A streamlined checkout process (upcoming).

- **Payment Integration:** Secure payment processing through PayPal, ensuring a trustworthy and efficient transaction (upcoming).

- **Order Tracking:** Track the status of your orders in real-time, from purchase to delivery (upcoming).

- **Admin account:** Admin can manage orders and the user list (upcoming).

#### Technologies

<p align="center">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="vite.js">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="javascript">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="redux">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="react-router">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind-css">
  
</p>
<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node.js">
  <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb">
</p>

#### Challenges & Troubleshootings

- As a user story, users should be able to add products before login and keep them after login. I needed to use local storage for cart data and direct users to the checkout page after login (when they clicked 'proceed to checkout').
- After deployment, the server doesn't catch the 'CatchAll route', so a 404 Error keeps happening every time the page is refreshed, which forced me to use createBrowserRoute instead. Needs fixing.
- Responsive web app but still edge cases of breakpoint which harm UI/UX.

- **Deployed on Render.com**

## Next Steps

- Implement different authentication methods.
- Create admin routes.
- Complete payment process.
