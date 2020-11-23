import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./News.css";

function News() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterNews, setfilterNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=f2788ad462d748928013816f1d3e1113"
      )

      .then((res) => {
        console.log(res.data.articles);
        setData(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  },[] );

  useEffect(() => {
    setfilterNews(
      data.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data]);

  return (
    <div>
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search search-icon" />
        </label>
      </div>
      {filterNews.map((datas) => (
        <div className="cont" style={{ display: "inline-block" }}>
          <Card
            style={{
              width: "18rem",
              height: "36rem",
              background: "white",
              margin: "20px 24px",
              boxShadow: "5px 5px 5px #333333",
            }}
          >
            <Card.Img
              class="img1"
              variant="top"
              src={datas.urlToImage}
              height="150px"
            />

            <Card.Body>
              <Card.Title
                style={{
                  textAlign: "left",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "1rem",
                }}
              >
                {datas.title}
              </Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "13px" }}>
                {datas.description}
              </Card.Text>
              <Card.Text style={{ textAlign: "left" }}>
                Author: {datas.author ? datas.author : "Anon"}
              </Card.Text>
              <a href={datas.url} target="_blank" class="btn btn-primary">
            Read more...
              </a>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default News;
