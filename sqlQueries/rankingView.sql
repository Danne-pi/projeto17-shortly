CREATE VIEW view_ranking AS
SELECT
  users.id,
  users.name,
  COUNT(links.id) AS "linksCount",
  coalesce(sum(links.views),0) AS "visitCount"
FROM users LEFT JOIN links
ON links."userId" = users.id
GROUP BY users.id  
ORDER BY "visitCount" DESC