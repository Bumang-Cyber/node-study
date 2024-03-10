async function getUser() {
  // 로딩 시 사용자 가져오는 함수
  try {
    const res = await axios.get("/users");
    const users = res.data;
    const list = document.getElementById("list");

    list.innerHTML = "";

    const deleteAll = document.createElement("button");
    deleteAll.textContent = "모두 삭제하기";
    deleteAll.addEventListener("click", async () => {
      const isDeleteAll = confirm("정말 모두 삭제하시겠어요?");
      if (!isDeleteAll) return;
      try {
        await axios.delete("/delete-all/users");
        getUser();
      } catch (err) {
        console.error(err);
      }
    });
    list.appendChild(deleteAll);

    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        // 수정 버튼 클릭
        const name = prompt("바꿀 이름을 입력하세요");
        if (!name) {
          return alert("이름을 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/user/" + key, { name });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        // 삭제 버튼 클릭
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      const makeItsTextBunny = document.createElement("button");
      makeItsTextBunny.textContent = "토끼로 만들기";
      makeItsTextBunny.addEventListener("click", async () => {
        // 토끼로 만들기 클릭
        try {
          await axios.put("/rabbitify/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      userDiv.appendChild(makeItsTextBunny);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

async function getComment() {
  try {
    const res = await axios.get("/comment");
    const comments = res.data;
    const commentList = document.getElementById("comment-list");
    console.log(commentList, "commentlist");

    commentList.innerHTML = "";

    const deleteAll = document.createElement("button");
    deleteAll.textContent = "코멘트 모두 삭제하기";
    deleteAll.addEventListener("click", async () => {
      const isDeleteAll = confirm("정말 모두 삭제하시겠어요?");
      if (!isDeleteAll) return;
      try {
        await axios.delete("/delete-all/comments");
        getComment();
      } catch (err) {
        console.error(err);
      }
    });
    commentList.appendChild(deleteAll);

    Object.keys(comments).map(function (key) {
      const commentDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = comments[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        // 수정 버튼 클릭
        const name = prompt("바꿀 이름을 입력하세요");
        if (!name) {
          return alert("이름을 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/comment/" + key, { name });
          getComment();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        // 삭제 버튼 클릭
        try {
          await axios.delete("/comment/" + key);
          getComment();
        } catch (err) {
          console.error(err);
        }
      });
      const makeItsTextBunny = document.createElement("button");
      makeItsTextBunny.textContent = "토끼로 만들기";
      makeItsTextBunny.addEventListener("click", async () => {
        // 토끼로 만들기 클릭
        try {
          await axios.put("/rabbitify/comment/" + key);
          getComment();
        } catch (err) {
          console.error(err);
        }
      });

      commentDiv.appendChild(span);
      commentDiv.appendChild(edit);
      commentDiv.appendChild(remove);
      commentDiv.appendChild(makeItsTextBunny);
      commentList.appendChild(commentDiv);
      console.log(res.data, "res.data");
    });
  } catch (err) {
    console.log(err);
  }
}

async function loadData() {
  await getUser();
  await getComment();
}
window.onload = loadData; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert("이름을 입력하세요");
  }

  try {
    await axios.post("/user", { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = "";
});

document.getElementById("comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const comment = e.target["comment-input"].value;
  if (!comment) {
    return alert("코멘트를 입력하세요");
  }

  try {
    await axios.post("/comment", { comment });
    getComment();
  } catch (err) {
    console.error(err);
  }
  e.target["comment-input"].value = "";
});
