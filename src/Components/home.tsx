import React, { useState, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  published_at: string;
  image_url: string;
  news_site: string;
  summary: string;
}

function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = () => {
      fetch('https://api.spaceflightnewsapi.net/v4/articles')
        .then((response) => {
          if (response.ok) {
            
            return response.json();
          } else {
            console.error('Error fetching articles:');
            throw new Error(`Error`);
          }
        })
        .then((data) => {
            const articlesData = data.results || []; 
            console.log(articlesData); 
            
            
            setArticles(articlesData);
        })
        .catch((error) => {
          console.error('Error fetching articles', error);
        });
    };

    fetchArticles();
  }, []);
 
  
  return (
    <div className="main ">
      <h1>Spaceflight News Articles</h1>
      <div className="articles">
      {articles.map((article) => {
  return (
    <div className="article" key={article.id}>
      <h2>{article.title}</h2>
      <p>Published at: {article.published_at}</p>
      <img src={article.image_url} alt={article.title} />
      <p>{article.summary}</p>
      <p>Source: {article.news_site}</p>
    </div>
  );
})}

      </div>
    </div>
  );
}

export default Home;
