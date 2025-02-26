(async ()=>{

  /*
    TEMPLATE    : AGC CSR DB IN (free)
    Dev         : MASKODING
    Author      : ABDI SYAHPUTRA HARAHAP
    Email       : maskoding12@gmail.com
    Website     : https://www.maskoding.com
    Group Dev   : https://www.facebook.com/groups/csragc
  */

  /* ------------------------------------------------------*/
  const basePointHost = "https://kl4ka1.yupin.my.id";
  const version = "1.0";
  /* ------------------------------------------------------*/

  let data = null;

  // Tambahkan template loading screen
let template_loading = `
<div class="skeleton-loading">
    <div class="skeleton-header">
        <div class="skeleton-brand"></div>
        <div class="skeleton-nav"></div>
    </div>
    
    <div class="skeleton-main">
        <div class="skeleton-sidebar">
            <div class="skeleton-menu"></div>
            <div class="skeleton-menu"></div>
            <div class="skeleton-menu"></div>
        </div>
        
        <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
        </div>
        
        <div class="skeleton-ads">
            <div class="skeleton-ad-box"></div>
            <div class="skeleton-ad-box"></div>
        </div>
    </div>
</div>`;

// Tampilkan loading screen saat inisialisasi
document.body.innerHTML = template_loading;

  // template 403
  let template_403 = `<div class="error403-container">
        <div class="error403-icon-wrapper">
            <i class="fas fa-globe-asia error403-icon"></i>
            <div class="error403-icon-circle"></div>
        </div>
        <div class="error403-content">
            <h1 class="error403-title">Akses Ditolak</h1>
            <p class="error403-message">
                Maaf, Anda <b>tidak di izinkan</b> untuk menampilkan <b>kontent CSR</b> di website ini.
                Hal ini mungkin terjadi karena:
            </p>
            <ul class="error403-list">
                <li>
                    <i class="fas fa-plus-circle"></i>
                    <span>Anda belum menambahkan <b>domain website ini</b> ke akun Anda. jika anda belum memiliki akun, silahkan <a href="https://in.csragc.com/signup" target="_blank">daftar</a> terlebih dahulu. Kemudian tambahkan <b>domain website ini</b> ke bagian <a href="https://in.csragc.com/panel?page=add-domain" target="_blank">Add Domain</a> di dashboard Anda.</span>
                </li>
                <li>
                    <i class="fas fa-link"></i>
                    <span>Anda telah memiliki akun, tetapi anda belum menambahkan <b>domain website ini</b> ke akun Anda. silahkan tambahkan <b>domain website ini</b> ke bagian <a href="https://in.csragc.com/panel?page=add-domain" target="_blank">Add Domain</a> di dashboard Anda.</span>
                </li>
            </ul>
            <div class="error403-actions">
                <a href="https://in.csragc.com/login" target="_blank" class="error403-button primary">
                    <i class="fas fa-tachometer-alt"></i>
                    Login ke panel dashboard
                </a>
                <a href="https://in.csragc.com/signup" target="_blank" class="error403-button secondary">
                    <i class="fas fa-user-plus"></i>
                    daftar akun
                </a>
            </div>
            <div class="error403-help">
                <p>Butuh bantuan? <a href="https://www.facebook.com/maskodingku/" target="_blank"><i class="fab fa-facebook"></i> Hubungi Developer (admin)</a></p>
            </div>
        </div>
    </div>`;
  
  // template 503
  let template_503 = `<div class="error503-container">
        <i class="fas fa-exclamation-circle error503-icon"></i>
        <div class="error503-code">Oops!</div>
        <h1 class="error503-title">Terjadi Kesalahan Saat Memuat Halaman</h1>
        <p class="error503-message">
            Mohon maaf, kami mengalami kendala saat mencoba mengakses halaman yang Anda tuju.
            Hal ini mungkin terjadi karena:
            <ul class="error503-list">
                <li>Koneksi internet tidak stabil</li>
                <li>Server sedang dalam pemeliharaan</li>
                <li>Trafik yang terlalu tinggi</li>
            </ul>
        </p>
        <div class="error503-retry-section">
            <div class="error503-retry-timer">
                Mencoba kembali dalam <span id="countdown">60</span> detik
            </div>
            <p class="error503-retry-message">
                Halaman akan dimuat ulang secara otomatis.
            </p>
        </div>
        <button id="retryButton" class="error503-retry-button" disabled>
            <i class="fas fa-sync-alt"></i>
            Muat Ulang Halaman
        </button>
    </div>`;

  // template 404
  let template_404 = `<div class="error404-container">
        <div class="error404-animation">
            <div class="error404-ghost">
                <div class="error404-ghost-body">
                    <div class="error404-ghost-eyes"></div>
                    <div class="error404-ghost-waves">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="error404-shadow"></div>
        </div>
        <div class="error404-content">
            <h1 class="error404-title">404</h1>
            <h2 class="error404-subtitle">Oops! Halaman Tidak Ditemukan</h2>
            <p class="error404-message">
                Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
            </p>
            <div class="error404-actions">
                <button onclick="window.history.back()" class="error404-button secondary">
                    <i class="fas fa-arrow-left"></i>
                    Kembali
                </button>
                <a href="/" class="error404-button primary">
                    <i class="fas fa-home"></i>
                    Ke Beranda
                </a>
            </div>
        </div>
    </div>`;

  // template
  let template = `<header class="main-header">
        <nav class="navbar">
            <div class="container">
                <a href="/" class="brand">{{title-headers}}</a>
                <div class="nav-right">
                    <div class="search-container">
                        <form class="search-form">
                            <input type="text" class="search-input" placeholder="{{Cari artikel}}...">
                            <button type="submit" class="search-btn" aria-label="{{Submit pencarian}}">
                                <i class="fas fa-search"></i>
                            </button>
                        </form>
                        <button class="search-toggle" aria-label="{{Toggle pencarian}}">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <button class="sidebar-toggle" aria-label="{{Toggle menu sidebar}}">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </nav>
    </header>
    <main class="main-content">
        <div class="blog-intro">
            <div class="container">{{intro-content}}</div>
        </div>

        <!-- Tambahkan responsive ads setelah blog-intro -->
        <div class="container">
            <div class="intro-ad ad-header">
              <div class="ad-placeholder"><span>Responsive Ad Header</span></div>
            </div>
        </div>

        <div class="container main-container">
            <aside class="sidebar">
                <div class="sidebar-content">
                    <div class="sidebar-header">
                        <h2>{{Menu Utama}}</h2>
                        <button class="sidebar-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <nav class="sidebar-nav main-nav">
                        <ul class="nav-links">
                            <li><a href="/" class="active">{{Beranda}}</a></li>
                        </ul>
                    </nav>
                    <!-- script ads navigation -->
                    <div class="nav-ads-full ad-navigation">
                        <div class="nav-ads-container">
                            <span>Responsive Ad Navigation</span>
                        </div>
                    </div>
                </div>
            </aside>

            {{main-content}}

            <aside class="ads-sidebar">
                <div class="ads-wrapper">
                    <div class="ads-box ad-dev">
                      <div class="ads-placeholder"><span>Responsive Ad Dev</span></div>
                    </div>
                    <div class="ads-box ad-sticky">
                      <div class="ads-placeholder"><span>Responsive Ad Sticky</span></div>
                    </div>
                </div>
            </aside>
        </div>
    </main>
    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2024 {{title-headers}}.</p>
        </div>
    </footer>`;

  /* ---------------- area fungsi start ----------------*/

  // fungsi template 403
  function show_page_403(){
    document.body.classList.add("error-page");
    document.body.innerHTML = template_403;
    document.title = "403 - Error access denied";
  };

  // fungsi template 503
  function show_page_503(){
    document.body.classList.add("error-page");
    document.body.innerHTML = template_503;
    document.title = "503 - Error retry page";
    js_template_503();
  };

  // fungsi js untuk template 503
  function js_template_503(){
    let countdown = 60;
    const countdownDisplay = document.getElementById('countdown');
    const retryButton = document.getElementById('retryButton');
    function updateCountdown() {
        countdown--;
        countdownDisplay.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(timer);
            retryButton.disabled = false;
            retryButton.innerHTML = '<i class="fas fa-sync-alt"></i> Muat Ulang Halaman';
            retryButton.addEventListener('click', reloadPage);
        };
    };
    function reloadPage() {
        retryButton.disabled = true;
        retryButton.innerHTML = '<i class="fas fa-sync-alt loading"></i> Sedang Memuat...';
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    const timer = setInterval(updateCountdown, 1000);
    setTimeout(reloadPage, countdown * 1000);
  };

  // fungsi template 404
  function show_page_404(){
    document.body.classList.add("error-page");
    document.body.innerHTML = template_404;
    document.title = "404 - Error page not found";
  };

  // fungsi load magic
  function load_magic(data){ 
    const elMagic = document.createElement("script");
    elMagic.src = data?.p;
    elMagic.defer = true;
    elMagic.async = true;
    elMagic.onload = ()=>{
      window.dataMagic = data?.d;
    };
    document.body.appendChild(elMagic);
  };
  
  // fungsi template index
  function show_page_index(){

    template = template.replaceAll("{{main-content}}",`
      <section class="featured-posts">
          <h1>{{Artikel Terbaru}}</h1>
          <div class="post-grid">
              {{dom-content}}
          </div>
      </section>
    `);

    // ganti title-headers
    template = template.replaceAll("{{title-headers}}",window.location.hostname);

    if(data?.data_index?.length > 0){
      let dom_content = "";
      let count_content = 0;
      for(let data_content of data.data_index){
        const content = document.createElement("article");
        content.classList.add("post-card");
        let data_time = new Date(data_content.c);
        let data_time_format = data_time.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        const timeUpdate = new Date().getTime();
        const query_url = "?"+data?.iqc+"="+data_content.n+"&update="+timeUpdate;
        content.innerHTML = `
          <div class="post-content">
            <h2><a href="${query_url}">${data_content.t}</a></h2>

            <div class="post-stats">
              <div class="rating">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <span>4.5</span>
              </div>
              <div class="post-info">
                <span class="views"><i class="fas fa-eye"></i> ${data_content.v}</span>
                <span class="comments"><i class="fas fa-comment"></i> ${data_content.k}</span>
              </div>
            </div>

            <p class="post-excerpt">${data_content.d}</p>
            <div class="post-meta">
              <span class="date">${data_time_format}</span>
            </div>
          </div>
        `;
        dom_content += content.outerHTML;
        count_content++;
        // tambahkan post ad responsive tiap 2 content setelahnya
        if(count_content % 2 == 0){
          dom_content += `<div class="post-ad ad-card-home">
            <div class="ad-placeholder"><span>Responsive Ad Card Home</span></div>
          </div>`;
        };
      };
      // tambahkan dom content
      template = template.replaceAll("{{dom-content}}",dom_content);
    };

    // ganti intro content
    template = template.replaceAll("{{intro-content}}",`
      <div class="intro-content">
        <h2>${data?.tnd?.TITLE}</h2>
        <p>${data?.tnd?.DESCRIPTION}</p>
      </div>
    `);

    // ganti translet
    for(let obj of Object.entries(data?.translet || {})){
       let key = obj[0];
       let value = obj[1];
       if(key && value){
        template = template.replaceAll(key,value);
       };
    };
    
    document.body.innerHTML = template;
    document.title = data?.tnd?.TITLE || window.location.hostname;

    // tambahkan meta description
    const meta_description = document.createElement("meta");
    meta_description.setAttribute("name","description");
    meta_description.setAttribute("content",data?.tnd?.DESCRIPTION||"");
    document.head.appendChild(meta_description);
    // tambahkan meta locale
    const meta_locale = document.createElement("meta");
    meta_locale.setAttribute("property","og:locale");
    meta_locale.setAttribute("content",data?.locale);
    document.head.appendChild(meta_locale);
    // ganti lang
    document.documentElement.lang = data?.lang;

    // load magic
    if(data?.ad?.p){
      load_magic(data?.ad);
    };

    // Inisialisasi sidebar setelah render
    initializeSidebar();

  };

  // fungsi load content
  function load_content(data){
    const time_format_publish = new Date(data?.data_content?.e || data?.data_content?.c || new Date()).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const title_content = data?.data_content?.t || "";
    const description_content = data?.data_content?.d || title_content;
    const author_name = data?.data_content?.data?.author?.nick || "Anonyme";
    const total_views = data?.data_content?.data?.content?.length || 0;
    const total_comment = data?.data_content?.t?.length || data?.data_content?.d || 0;
    const total_shares = data?.data_content?.data?.subject?.name?.length || 0;
    const data_question = data?.data_content?.data?.content || "";

    // ganti title-headers
    template = template.replaceAll("{{title-headers}}",window.location.hostname);

    template = template.replaceAll("{{main-content}}",`
      <article class="blog-post-content">
          <div class="post-content-wrapper">
            <div class="post-text" itemscope="" itemtype="https://schema.org/QAPage">
              <div class="question-section" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">


                <div class="question-header">
                    <h2>{{Pertanyaan}}</h2>
                    <div class="question-meta">
                      <span class="difficulty"><i class="fas fa-signal"></i> {{Grade}}: ${data?.data_content?.data?.grade?.name || "Other"}</span>
                      <span class="subject"><i class="fas fa-book"></i> {{Subject}}: ${data?.data_content?.data?.subject?.name || "Other"}</span>
                    </div>
                </div>
                <div class="question-content">
                    <div itemprop="text name">${data_question}</div>
                    <div class="question-details">
                      <div class="asker-info">
                          <span class="asker-avatar">
                          <i class="fas fa-user-circle"></i>
                          </span>
                          <span class="asker-name">{{Ditanyakan oleh}}: <span itemprop="author" itemscope="" itemtype="https://schema.org/Person"><span itemprop="name"><a itemprop="url" href="#${data?.data_content?.data?.id || author_name.toUpperCase()}">${author_name.toUpperCase()}</a></span></span></span>
                      </div>
                      <div class="question-stats">
                          <span class="views"><i class="fas fa-eye"></i> <span itemprop="upvoteCount">${total_views}</span> {{dilihat}}</span>
                          <span class="answers"><i class="fas fa-comment-dots"></i> <span itemprop="answerCount">${total_comment}</span> {{jawaban}}</span>
                      </div>
                      <meta itemprop="dateCreated" content="2024-03-12T10:00:00+07:00">
                    </div>
                </div>

                <div class="responsive-ad ad-after-question">
                  <div class="ad-placeholder"><span>Responsive Ad After Question</span></div>
                </div>

                <div class="answers-section">
                  <h3>{{Jawaban}} (${total_comment})</h3>
                  {{answer-card}}
                </div>


              </div>
            </div>
            <div class="load-more-answers">
              <button class="load-more-btn">
                <span class="btn-text">{{Lihat jawaban lainnya}} (${total_comment})</span>
                <span class="btn-icon"><i class="fas fa-chevron-down"></i></span>
                <span class="loading-spinner"><i class="fas fa-circle-notch"></i></span>
              </button>
            </div>

            <div class="related-posts list-style" itemscope itemtype="https://schema.org/ItemList">
              <h3 itemprop="name">{{Artikel Terkait}}</h3>
              <div class="related-posts-list">
                {{related-posts}}
              </div>
            </div>

          </div>
      </article>
    `);

    // ganti intro content
    template = template.replaceAll("{{intro-content}}",`
      <div class="intro-content">
        <h1>${title_content}</h1>
          <div class="post-meta-header">
              <div class="author-info">
                  <span class="author-avatar">
                      <i class="fas fa-user-circle"></i>
                  </span>
                  <span class="author-name">{{Oleh}}: ${author_name.toUpperCase()}</span>
              </div>
              <div class="post-details">
                  <span class="post-date"><i class="fas fa-calendar"></i> ${time_format_publish}</span>
                  <span class="post-category"><i class="fas fa-folder"></i> ${data?.data_content?.data?.subject?.name || "Other"}</span>
                  <span class="read-time"><i class="fas fa-clock"></i> 5 {{menit baca}}</span>
              </div>
              <div class="post-stats-header">
                  <div class="rating">
                      <div class="stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                      </div>
                      <span>4.5</span>
                  </div>
                  <div class="post-info">
                      <span class="views"><i class="fas fa-eye"></i> ${total_views} {{views}}</span>
                      <span class="comments"><i class="fas fa-comment"></i> ${total_comment} {{komentar}}</span>
                      <span class="shares"><i class="fas fa-share-alt"></i> ${total_shares} {{shares}}</span>
                  </div>
              </div>
          </div>
      </div>
    `);

    let dom_answer_card = "";
    let isFirst = true;
    for(let answer of (data?.data_content?.data?.answers?.nodes || [])){
      // console.log(answer);
      let time_format_answer = new Date(answer?.created || new Date()).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      let name_author_answer = answer?.author?.nick || "Anonyme";
      let total_like = answer?.author?.nick?.length || "Anonyme".length;
      dom_answer_card += `
        <div id="answer-${answer?.id || name_author_answer.toUpperCase()}" class="answer-card ${isFirst ? "best-answer" : ""} " itemprop="${isFirst ? "acceptedAnswer" : "suggestedAnswer"}" itemscope="" itemtype="https://schema.org/Answer">
          <meta itemprop="url" content="${window.location.href}#answer-${answer?.id || name_author_answer.toUpperCase()}">
          <div class="answer-header">
            <div class="answerer-info">
              <span class="answerer-avatar">
              <i class="fas fa-user-tie"></i>
              </span>
              <div class="answerer-details">
                <span class="answerer-name" itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                  <span itemprop="name"><a itemprop="url" href="#${answer?.id || name_author_answer.toUpperCase()}">${name_author_answer.toUpperCase()}</a></span>
                  <meta itemprop="jobTitle" content="Web Performance Expert">
                </span>
              </div>
            </div>
            <div class="answer-rating">
              ${isFirst ? `<span class="best-answer-badge"><i class="fas fa-check-circle"></i> {{Jawaban Terbaik}}</span>` : ""}
              <div class="rating-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <span class="rating-count">(<span itemprop="upvoteCount">${answer?.content?.length || 0}</span>)</span>
              </div>
            </div>
          </div>
          <div class="answer-content" itemprop="text">
            ${answer?.content || ""}
            <div class="answer-footer">
              <div class="answer-actions">
                <button class="helpful-btn"><i class="fas fa-thumbs-up"></i> {{Membantu}} (${total_like})</button>
                <button class="share-btn"><i class="fas fa-share"></i> {{Bagikan}}</button>
              </div>
              <span class="answer-date">{{Dijawab pada tanggal}} ${time_format_answer}</span>
            </div>
          </div>
          <meta itemprop="dateCreated" content="${answer?.created || new Date().toISOString()}">
        </div>`;
      isFirst = false;
    };
    if((data?.data_content?.data?.answers?.nodes || []).length == 0){
      dom_answer_card = `<div id="answer-none" class="answer-card  " itemprop="suggestedAnswer" itemscope="" itemtype="https://schema.org/Answer">
          <meta itemprop="url" content="${window.location.href}#answer-none">
          <div class="answer-header">
            <div class="answerer-info">
              <span class="answerer-avatar">
              <i class="fas fa-user-tie"></i>
              </span>
              <div class="answerer-details">
                <span class="answerer-name" itemprop="author" itemscope="" itemtype="https://schema.org/Person">
                  <span itemprop="name"><a itemprop="url" href="#answer-none">Anonyme</a></span>
                  <meta itemprop="jobTitle" content="User">
                </span>
              </div>
            </div>
            <div class="answer-rating">
              <div class="rating-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                <span class="rating-count">(<span itemprop="upvoteCount">71</span>)</span>
              </div>
            </div>
          </div>
          <div class="answer-content" itemprop="text">
            <p>anwered by anonymous</p>
            <div class="answer-footer">
              <div class="answer-actions">
                <button class="helpful-btn"><i class="fas fa-thumbs-up"></i> Helpful (16)</button>
                <button class="share-btn"><i class="fas fa-share"></i> Share</button>
              </div>
              <span class="answer-date">Answered on 11 Juni 2019</span>
            </div>
          </div>
          <meta itemprop="dateCreated" content="2019-06-10T19:29:49.000Z">
        </div>`;
    };
    template = template.replaceAll("{{answer-card}}",dom_answer_card);

    let dom_related_posts = "";
    let totalItem = 0;
    // insert total item backlink
    if(data?.data_backlink?.length>0){
      totalItem += data?.data_backlink?.length;
    };
    // insert total item related posts
    if(data?.data_related?.length>0){
      totalItem += data?.data_related?.length;
    };
    // insert dom total item
    if(totalItem>0){
      dom_related_posts += `
        <meta itemprop="numberOfItems" content="${totalItem}" />
        <meta itemprop="itemListOrder" content="Descending" />
      `;
    };
    // insert dom backlink
    for(let data_backlink of (data?.data_backlink || [])){
      let format_date_backlink = new Date(data_backlink?.p || new Date()).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      let id_backlink = data_backlink?.n?.replace(".gz","");
      let link_backlink = window.location.protocol+"//"+data_backlink?.domain+"/"+"?"+data_backlink?.path+"="+id_backlink+"&update="+new Date().getTime();
      dom_related_posts += `
        <a href="${link_backlink}" class="related-post-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/Article">
          <meta itemprop="url" content="${link_backlink}">
          <div class="post-content">
            <h4 itemprop="name headline">${data_backlink?.t}</h4>
            <div class="post-meta">
              <span><i class="fas fa-calendar"></i><time itemprop="datePublished" datetime="${data_backlink?.p}"> ${format_date_backlink}</time></span>
              <span><i class="fas fa-eye"></i> <span itemprop="interactionStatistic">${data_backlink?.v}  {{views}}</span></span>
              <span><i class="fas fa-comment"></i> <span itemprop="interactionStatistic">${data_backlink?.t?.length || 0}  {{komentar}}</span></span>
            </div>
          </div>
        </a>
      `;
    };
    // insert dom related posts
    for(let data_related of (data?.data_related || [])){
      let format_date_related = new Date(data_related?.p || new Date()).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      let id_related = data_related?.name?.replace(".gz","");
      let link_related = window.location.origin+window.location.pathname+"?"+data?.iqc+"="+id_related+"&update="+new Date().getTime();
      dom_related_posts += `
        <a href="${link_related}" class="related-post-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/Article">
            <meta itemprop="url" content="${link_related}">
            <div class="post-content">
              <h4 itemprop="name headline">${data_related?.t}</h4>
              <div class="post-meta">
                  <span><i class="fas fa-calendar"></i><time itemprop="datePublished" datetime="${data_related?.p}"> ${format_date_related}</time></span>
                  <span><i class="fas fa-eye"></i> <span itemprop="interactionStatistic">${data_related?.v}  {{views}}</span></span>
                  <span><i class="fas fa-comment"></i> <span itemprop="interactionStatistic">${data_related?.t?.length || 0}  {{komentar}}</span></span>
              </div>
            </div>
        </a>
      `;
    };
    // insert dom related posts
    template = template.replaceAll("{{related-posts}}",dom_related_posts);

    // ganti translet
    for(let obj of Object.entries(data?.translet || {})){
      let key = obj[0];
      let value = obj[1];
      if(key && value){
       template = template.replaceAll(key,value);
      };
    };

    document.body.innerHTML = template;
    document.title = data?.data_content?.t;

    // element meta description
    const meta_description = document.createElement("meta");
    meta_description.setAttribute("name","description");
    meta_description.setAttribute("content",data?.data_content?.d || data?.data_content?.t);
    document.head.appendChild(meta_description);

    // element script ld+json CreativeWorkSeries
    const script_ld_json = document.createElement("script");
    script_ld_json.type = "application/ld+json";
    script_ld_json.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWorkSeries",
      "url": window.location.href,
      "name": title_content,
      "alternateName": title_content,
      "description": description_content,
      "inLanguage": "id",
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "0",
          "ratingCount": total_views,
          "reviewCount": total_comment
      },
      "author": {
          "@type": "Person",
          "name": author_name
      },
      "publisher": {
          "@type": "Organization",
          "name": window.location.hostname
      }
    });
    document.head.appendChild(script_ld_json);

    // tambahkan meta locale
    const meta_locale = document.createElement("meta");
    meta_locale.setAttribute("property","og:locale");
    meta_locale.setAttribute("content",data?.locale);
    document.head.appendChild(meta_locale);
    // ganti lang
    document.documentElement.lang = data?.lang;

    // load magic
    if(data?.ad?.p){
      load_magic(data?.ad);
    };

    // Inisialisasi sidebar setelah render
    initializeSidebar();

  };

  function initializeSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const body = document.body;

    // Buat overlay element
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);

    // Toggle sidebar
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    };

    sidebarClose?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);
  }

  /* ---------------- area fungsi end ----------------*/

  // main
  const apiPoint = basePointHost+"/api";
  const search = window.location.search;

  let isError = false;
  let referrer;
  if(document.referrer.includes(window.location.hostname)) referrer = "httbrainlyanswerer.blogspot.com"
  else referrer = document.referrer
  await new Promise((resolve)=>{
    fetch(apiPoint+search, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "host" : "brainlyanswerer.blogspot.com",
        "path" : window.location.pathname,
        "search" : window.location.search,
        "ref": referrer,
        "v":version
      }),
    })
    .then(response => response.json())
    .then(resp => {
      data = resp;
      resolve();
    })
    .catch((error) => {
      isError = true;
      resolve();
    });
  });

  if(isError){
    show_page_503();
    return;
  } else if(data?.type_page == 403 && data?.status == 403){
    show_page_403();
    return;
  } else if(data?.type_page == 404 && data?.status == 404){
    show_page_404();
    return;
  }else if(data?.type_page == "index" && data?.status == 200){
    show_page_index();
    return;
  }else if(data?.type_page == "content" && data?.status == 200){
    load_content(data);
    return;
  };

})();
