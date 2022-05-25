const postareSection = document.getElementById('postare-section');

const url = new URL(document.location);
let id = url.searchParams.get("id");

postariDb.doc(id).get().then(renderPost);

function renderPost(doc) {
    let postare = doc.data();

    let html = `
    
    <div class="postare-full">
                <div class="likes">
                    <i class="far fa-heart" id="no-like"></i>
                    <i class="fas fa-heart" id="yes-like"></i>
                    <span id="likes-count"> ${postare.likes.length} </span>
                </div>

                <h1 class="centered"> ${postare.title} </h1>
                <img
                    src="${postare.img}">
                <p>
                    ${postare.long}
                </p>

                <br/>
                <span> <i>Creat de: </i></span>
                <i> ${postare.username} </i>
                <br>
                <span id="data"> ${formatDate(postare.created)} </span>
            </div>
    
    `;

    postareSection.innerHTML = html;
}

