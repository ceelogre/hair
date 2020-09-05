const container = document.querySelector('.container')
const commentForm = document.querySelector('.comment-form')
const articleTitle = document.querySelector('#articleTitle')
const articleContent = document.querySelector('#articleContent')
const updateButton = document.querySelector('#sendComment')
const closeBtn = document.querySelector('.closeBtn')

closeBtn.addEventListener('click', () => {
    commentForm.classList.toggle('active-comment')
    container.classList.toggle('active-blur')
})

const renderPost = (doc) => {
    const post = document.createElement('div')
    post.setAttribute('class', 'post')

    const title = document.createElement('h1')
    title.setAttribute('class', 'post-title')
    title.textContent = doc.title

   /* const content = document.createElement('p')
    content.setAttribute('class', 'post-content')
    if (doc.content.length > 150) {
        content.textContent = doc.content.substr(0, 150) + '....'
    }
*/
const content = document.createElement("p");
  content.setAttribute("class", "post-content");
  content.textContent = doc.content;



    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'post-delete')
    deleteBtn.textContent = "Delete"

    const updateBtn = document.createElement('button')
    updateBtn.setAttribute('class', 'post-update')
    updateBtn.textContent = "update"

    post.setAttribute('data_id', doc._id)

    post.appendChild(title)
    post.appendChild(content)
    post.appendChild(deleteBtn)
    post.appendChild(updateBtn)

    container.appendChild(post)

    deleteBtn.addEventListener('click', (e) => {
        let varConfirm = confirm("Are you sure you want to delete🙄")
        if (varConfirm == true) {
            let id = e.target.parentElement.getAttribute('data_id')
            fetch(`http://127.0.0.1:3000/v1/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res => res.json())
            return true
        } else {
            return false
        }

    })

    updateBtn.addEventListener('click', (e) => {

        let id = e.target.parentElement.getAttribute('data_id')
        
        //open update form
        commentForm.classList.toggle('active-comment')
        container.classList.toggle('active-blur')

        //Get title and content
        fetch(`http://127.0.0.1:3000/v1/blogs/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(res => res.json())
            .then(res => {
                articleTitle.value = res.data.article.title
                articleContent.value = res.data.article.content
            })

        //update
        updateButton.addEventListener('click', (e) => {
            var refVar = confirm('Are you sure to update this article?')
            if (refVar == true) {
                fetch(`http://127.0.0.1:3000/v1/blogs/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    body: JSON.stringify({
                        title: articleTitle.value,
                        content: articleContent.value
                    })
                }).then(res => res.json())
                    .then(res => {
                        articleTitle.value = ''
                        articleContent.value = ''
                        location.reload()
                    })
            } else {
                return false
            }

        })
    })

}

const posts = [
    {
        title: "Ronald Mugema",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ea rem velit voluptatibus veniam. Id, est. Natus tempore eveniet possimus ut, sed est nostrum repudiandae quo suscipit earum magni consequuntur ipsum distinctio fuga culpa atque autem repellat recusandae! Soluta explicabo numquam tempore, amet tenetur placeat accusantium et quas dolorem laboriosam. Exercitationem sint soluta mollitia expedita vel porro vitae itaque beatae."
    },

    {
        title: "Happy Karigirwa",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ea rem velit voluptatibus veniam. Id, est. Natus tempore eveniet possimus ut, sed est nostrum repudiandae quo suscipit earum magni consequuntur ipsum distinctio fuga culpa atque autem repellat recusandae! Soluta explicabo numquam tempore, amet tenetur placeat accusantium et quas dolorem laboriosam. Exercitationem sint soluta mollitia expedita vel porro vitae itaque beatae."
    },

    {
        title: "Gerard Niyigena",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ea rem velit voluptatibus veniam. Id, est. Natus tempore eveniet possimus ut, sed est nostrum repudiandae quo suscipit earum magni consequuntur ipsum distinctio fuga culpa atque autem repellat recusandae! Soluta explicabo numquam tempore, amet tenetur placeat accusantium et quas dolorem laboriosam. Exercitationem sint soluta mollitia expedita vel porro vitae itaque beatae."
    }
]


// posts.forEach(el => renderPost(el))

fetch('http://127.0.0.1:3000/v1/blogs', {
    method: 'GET',
}).then(res => res.json())
    .then(dt => {
        dt.forEach( renderPost)
    })