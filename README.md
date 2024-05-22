
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Second-hand Goods Buying and Selling Platform</title>
</head>
<body>

<h1>Second-hand Goods Buying and Selling Platform</h1>

<p>Welcome to the Second-hand Goods Buying and Selling Platform! This project is a web application designed to facilitate the buying and selling of used or pre-owned goods. Built with Angular and Firebase, it provides a seamless and user-friendly experience for listing items, browsing products, and connecting buyers with sellers.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#components">Components</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li><strong>User Registration and Login:</strong> Create accounts and log in to access the buying and selling features.</li>
    <li><strong>Listing Creation:</strong> Create listings with photos, descriptions, price, and seller contact information.</li>
    <li><strong>Search and Browse:</strong> Search for specific items or browse listings by category, location, or price.</li>
    <li><strong>Rating and Feedback:</strong> Rate and provide feedback on transactions to build trust and credibility.</li>
    <li><strong>User Profiles:</strong> Manage listings, purchases, and received feedback.</li>
    <li><strong>Messaging System:</strong> Chat securely within the platform to discuss listings and finalize transactions.</li>
    <li><strong>Analytics and Reporting:</strong> Insights into listing performance and sales.</li>
    <li><strong>Wishlist:</strong> Save items for future reference.</li>
    <li><strong>Notifications:</strong> Receive updates on listings and messages.</li>
</ul>

<h2 id="components">Components</h2>
<ul>
    <li><strong>Login:</strong> User authentication.</li>
    <li><strong>Signup:</strong> Register a new user.</li>
    <li><strong>Ad Details:</strong> Displays product details (photo, name, price, description, category, condition, date created, user details, rating).</li>
    <li><strong>Ads:</strong> Component of ad cards.</li>
    <li><strong>Bread Crumb:</strong> Found in the user setting tab.</li>
    <li><strong>Confirmation Dialogue:</strong> For user confirmations.</li>
    <li><strong>Dashboard:</strong> Graphs related to user products (sold vs unsold items).</li>
    <li><strong>Edit Profile:</strong> Edit user information.</li>
    <li><strong>Favourites:</strong> Ads added to favourites by the user.</li>
    <li><strong>Feedback:</strong> Feedback given to the logged-in user.</li>
    <li><strong>File Upload:</strong> Allows photo uploads for ads.</li>
    <li><strong>Filters Sidebar:</strong> Filter ads by price, condition, etc.</li>
    <li><strong>Footer:</strong> Bottom of the page.</li>
    <li><strong>Header:</strong> Top of the page.</li>
    <li><strong>Generate Post:</strong> Publish a new ad.</li>
    <li><strong>Home:</strong> Category selection and homepage ads.</li>
    <li><strong>Messages:</strong> User messaging.</li>
    <li><strong>Notification:</strong> User notifications.</li>
    <li><strong>Search:</strong> Search functionality.</li>
    <li><strong>Sidebar:</strong> User profile tab settings (Overview, Post Ad, My Ads, Favourite Ads, Feedback, Messages, Settings, Sign Out).</li>
    <li><strong>User Ads:</strong> User-specific ads.</li>
</ul>

<h2 id="services">Services</h2>
<p>The project includes the following services to manage different aspects of the application:</p>
<ul>
    <li>advertisement.service.ts</li>
    <li>authorized-user.service.ts</li>
    <li>categories.service.ts</li>
    <li>governorate.service.ts</li>
    <li>messages.service.ts</li>
    <li>notification-service.service.ts</li>
    <li>search.service.ts</li>
    <li>user-ads.service.ts</li>
    <li>users.service.ts</li>
</ul>
<p>Each service has a corresponding <code>.spec.ts</code> file for unit testing.</p>

<h2 id="installation">Installation</h2>
<ol>
    <li>Clone the repository from GitHub:
        <pre><code>git clone https://github.com/your-username/second-hand-goods-platform.git</code></pre>
    </li>
    <li>Navigate to the project directory:
        <pre><code>cd second-hand-goods-platform</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h2 id="usage">Usage</h2>
<ol>
    <li>Run the development server:
        <pre><code>ng serve</code></pre>
    </li>
    <li>Open your browser and navigate to <a href="http://localhost:4200">http://localhost:4200</a>.</li>
</ol>

<h2 id="screenshots">Screenshots</h2>
<p>Below are some screenshots of various components and services of the project:</p>
<h3>Login</h3>
<img src="path_to_screenshot" alt="Login">
<h3>Signup</h3>
<img src="path_to_screenshot" alt="Signup">
<h3>Ad Details</h3>
<img src="path_to_screenshot" alt="Ad Details">
<h3>Dashboard</h3>
<img src="path_to_screenshot" alt="Dashboard">
<h3>Services Code</h3>
<img src="path_to_screenshot" alt="Services Code">

<p><em>More screenshots available in the screenshots folder.</em></p>

<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! Please fork the repository and submit a pull request for review.</p>

<h2 id="license">License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

<p>Thank you for checking out our Second-hand Goods Buying and Selling Platform! We hope you find it useful and easy to use. If you have any questions or feedback, please feel free to reach out. Happy buying and selling!</p>

</body>
</html>
