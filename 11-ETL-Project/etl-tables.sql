-- CREATE blockbuster TABLE
---------------------------
CREATE TABLE blockbuster (
	title TEXT PRIMARY KEY, 
	genre TEXT,
	rating TEXT,
	release_year INT,
	studio TEXT,
	worldwide_gross FLOAT
);

SELECT release_year, worldwide_gross
FROM blockbuster
LIMIT 10;

-- CREATE imdb TABLE
--------------------
CREATE TABLE imdb (
	title TEXT PRIMARY KEY,
	director TEXT,
	actors TEXT,
	rating FLOAT,
	votes INT,
	revenue_millions FLOAT,
	metascore FLOAT
);

SELECT title, revenue_millions
FROM imdb
LIMIT 10;

-- CREATE tmdb TABLE
--------------------
CREATE TABLE tmdb (
	title TEXT PRIMARY KEY,
	original_title TEXT,
	budget INT
);

SELECT title, budget
FROM tmdb
LIMIT 10;
