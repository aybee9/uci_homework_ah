-- QUERIES
-- 3 table join
-- TOP 10 movies worldwide
SELECT b.title, b.genre, i.director, t.budget,
	b.release_year, b.worldwide_gross, (b.worldwide_gross / t.budget) AS "Return"
FROM blockbuster b
INNER JOIN imdb i 
ON b.title = i.title
INNER JOIN tmdb t
ON i.title = t.title
ORDER BY b.worldwide_gross DESC
LIMIT 10;

-- Top 5 movies Genre
SELECT genre AS "Genre", SUM(worldwide_gross) AS "Worldwide Gross"
FROM blockbuster
GROUP BY genre
ORDER BY "Worldwide Gross" DESC
LIMIT 5;