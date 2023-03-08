let articlesPerPage,totalPages;
      let query = window.location.search.split("?")[1].split("&")[0].split("=")[1];
      let page = parseInt(window.location.search.split("?")[1].split("&")[1].split("=")[1]);

      const fetchNews = async (query, pageNo) =>{
        let a = await  fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=c89b7faa8c7f497c8963b37d19d905f0&pageSize=8&page=${pageNo}`);
        let r = await a.json();
        
        totalPages = Math.ceil(r.totalResults/articlesPerPage);
        pre.href = `/?q=${query}&pageNo=${page - 1}`;
        next.href = `/?q=${query}&pageNo=${page + 1}`;
        
        let str = "",author;
        for(let item of r.articles){
          if(item.author == null){
            author = "No Author";
          }else{
            author = item.author;
          }
          str = str + `
            <div class="card m-2" style="width: 18rem">
            <img src="${item.urlToImage}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <span style="text-decoration:underline;font-weight:500;">Author: ${author}</span>
                <p class="card-text">
                    ${item.description}
                </p>
                <a href="${item.url}" target="_blank" class="btn btn-primary">Read More</a>
            </div>
            </div>
          `;
        }
        content.innerHTML = str;
      }

      fetchNews(query, page);