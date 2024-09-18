# Arorial, Dungeons and Dragons Campaign Website

Welcome to the official website for our Dungeons and Dragons campaign set in the world of Arorial! This site serves as both a public resource for enthusiasts and a hub for our campaign players.

## Table of Contents

-   [About the Project](#about-the-project)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## About the Project

This website provides detailed information about the world of Arorial, including its history, geography, cultures, and notable characters. It also hosts the FoundryVTT world for our campaign, allowing us to utilize Foundry's integrated Audio/Video Chat feature.

The site is designed for two primary audiences:

-   **General Public:** Individuals interested in learning more about Dungeons and Dragons and the world of Arorial.
-   **Campaign Players:** Participants in the campaign who need access to in-world information and tools to enhance their gameplay experience.

## Features

-   **World Information:** Comprehensive details about the world of Arorial, including lore, maps, and more.
-   **Character Summaries:** Database of character summaries, accessible to players for quick reference.
-   **FoundryVTT Integration:** Hosting the FoundryVTT world to facilitate gameplay with integrated Audio/Video Chat.

## Technologies Used

-   **Frontend:** [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
-   **Database:** [MySQL](https://www.mysql.com/) - A relational database management system for storing character summary data.
-   **Virtual Tabletop:** [FoundryVTT](https://foundryvtt.com/) - A virtual tabletop for playing tabletop RPGs online.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and npm installed on your machine. You can download them [here](https://nodejs.org/).
-   MySQL installed and running. You can download it [here](https://www.mysql.com/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/dnd-campaign-website.git
    cd dnd-campaign-website
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    - Create a new database and user.
    - Import the provided SQL schema to set up the required tables.

4. Configure environment variables:

    - Create a `.env` file in the root directory.
    - Add the necessary database connection details and other configuration settings.

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

Once the development server is running, you can access the website at `http://localhost:3000`. Navigate through the sections to explore the world of Arorial and access the FoundryVTT integration (Requires SSL Certificate and FoundryVTT Licensed).

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or suggestions, please feel free to reach out:

-   **GitHub:** [CDChamberlin](https://github.com/CDChamberlin)
