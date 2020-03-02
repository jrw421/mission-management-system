Hey there! Thanks so much for taking a look at the Official Mission Management System. I had a really good time putting it together and I hope it's a well-rounded representation of my skillset. I spent a total of 3 days on the project. 

While my time and resources were limited, I included my thought process, design thinking, and what I would include/do differently given more time. Of course, please feel free to reach out with any questions or clarifications you may have. In addition - always open to feature requests and constructive criticism.

To start the application: 

1. Read the JSON from disk, find and fix corruption patterns, clean the data and finally populate the  database by running: 
    `npm run db-dev`
2. Start the frontend in development mode by running: 
    `npm run react-dev`
3. Start up the NodeJS backend by running: 
    `npm run server-dev` 
    OR 
    `npm run docker-build` and `npm run docker-run` if you would rather run it in a local Docker container.
4. Navigate to `localhost:3000` to view the running app (or `localhost:5000` if running with Docker.)

Supported Browsers:
- Officially Supported: Chrome 79.0.3945.130+

Frontend Notes: 
- Frontend design and modularity: 
    The first step I wanted to take when approaching the frontend build was to focus on reusability and modularity in component design. As an example, the CharacterCard atomic component is fundamental to the application as a whole and frequently used in molecules comprising several views. Routes were kept simple and straightforward, offering three views as per the requirements. 
- Data fetching and general functionality: 
    Data is loaded from the backend upon initial componentDidMount(), hydrating the frontend application with all data for superheroes and villians. The initial component then iterates through the data and renders a card for each character, adding an onClick to view further information about each individually. This initial component also provides the user with functionaltiy to compare up to four characters at once. In both the comparison view and the individual character view, users can view all available information for a given character.
- Frontend styling: 
    Given time constraints, I thought it prudent to use a component library, in this case MaterialUI. MaterialUI provided the framework for the character cards and button styling. In addition to this, some custom styling was included in a separate css file. While there is (regretably) some inline styling, this would have ideally all been moved to css files given more time.
- Front-End Testing: 
    This was made very difficult by my choice of using a pre-configured template with webpack 2.2.1. It had all the components I need for a basic build, but the outdated webpack version proved to make setting up Enzyme with Jest for testing front end components very difficult. In future projects (with longer timelines) I will absolutely stick with webpack 4+ to avoid arguably more complex configuration dealing with babel and the like.

Backend Notes: 
- JSON Data - reading, cleaning and parsing: 
    The first step in approaching creating a functional backend was to handle the corrupted JSON data, without, of course, modifying the original file. 

    Reading the JSON would have been simple - read the file from disk into memory and then parse using built-in JSON utilities. However! A few pesky commas made the task slightly more difficult. After an initial attempt at parsing the corrupted data it became clear that there was single corruption pattern, or rather, a common issue that was causing the JSON to be invalid. 

    Lucky for us, the pattern was easily identifiable and fixed with simple string manipulation. The corruption pattern was a trailing, final, erronous comma (",") at the end of complex JSON objects.
    The approach was to iterate through the JSON string until we encountered a "}" character, at which point we would iterate in the opposite direction until the first real character was found (not "\n" or " "). If this character was valid, no action was required. However if this character was a "," we remove it from the original string and move on. 

    The next step involved cleaning and normalizing the data. Almost all character objects showed properties with corrupted fields. This included the following corruption patterns:
    - null values
    - "-" values
    - and empty string
    In order to handle these values appropriately a built a recursive object explorer that replaced all corrupted values with "UNKNOWN" - this function is titled `cleanGeneral`.

    Several other specific patterns of corrupt data were identified and consequently fixed.
    - cleanId: Character IDs were often inconsistent or missing. In this case they were replaced with incrementing values starting at 1000 (out of the range of existing, non-corrupt IDs).
    - cleanName: Missing character names were attempted to be recovered from the character slug. They were
    also given standardized capitalization.
    - cleanSlug: Missing character slugs were randomly generated from the character name.
    - cleanAppearance: This was a challenging fix. Height and weight often contained one measurement in imperial or metric, which the reciprocal measurement would be missing. An example would be `[1kg, "-"]`.
    In this case an attempt was made to recover the opposing field using a manual conversion of metric to imperial data extracted. 
    - cleanAlignment: Alignment capitalization was standardized.

    It's important to note that the elaborate cleaning / data parsing was a conscious design decision. Sure many of these challenges could be handled on the front-end, however given that this could be imagined as production data (with the stakes at saving the world no less) I believe that any data loaded into the production DB would be expected to be standardized and error-free. 

    Future work in this section would be to:
    - Investigate the source of the JSON corruption
    - If the source is unmitigatable, determine other patterns of corruption that would cause the JSON
    to be invalid and not parseable. 
    - Identify other way to improve the quality of data using the existing data (e.g. - recovering name 
    from slug, height in CM from height in Feet, etc.) 

- Creating routes and helper functions: 
    Once the JSON data was successfully wrangled, I was able to create simple helper functions to load said data into basic tables. While I created a more in-depth relational schema, given the time constraints I opted to leave the majority of those tables unused, and adopted a more simplistic data loading approach. 

    After the data is cleaned, it is then loaded into only the critical tables (thosed referenced on the front-end) with basic fields. An final JSON field is appended to the record which contains the entire JSON data per character. 
    
    While this is not ideal, it served the function of passing sufficient data to the frontend. Future work would involve building out a more complete relational representation of the provided data.

    All server routes followed the basic pattern of calling helper functions to retrieve data from the DB (to standardize querying) then sending the appropriate data to the frontend.


Challenges: 
- JSON data cleaning and normalizing ended up being more in-depth and complicated than I had originally anticipated. There were many edge cases and fields that proved to be inconsistently inconsistent. Ultimately parsing the data was useful in speeding up front-end development, but I am conscious that this consumed a significant amount of time.
- While I have worked closely with Apiary, which is another API documentation platform, I have never worked with Swagger. I worked through the docs to produce the file included in this repo - very open to constructive criticism on how to improve in this area.

What would I go back and do differently?
- Add linting to my codebase earlier on! Having normally worked on legacy codebases with linting already installed, it was not at the forefront of my mind, and thus was not added until midway through my work, making the tedious process of retroactive linting a time consuming process. 
- Git workflow. Given the number of features and the timeline of the project I opted for the simplest git workflow possible. Given more time I would have defined (and documented) a more thorough workflow so that teammates could hop in and contribute at any point.
- More documentation and better commenting of code. Given more time I would have commented in the same fashion as the JSON cleaner files so that future me or teammates would be able to dive into the codebase and be able to clearly understand how everything worked.
- Given more time, I would have also added mySQL to the docker container, as currently it runs the node backend without the database.