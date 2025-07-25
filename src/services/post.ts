export const getPostList = async (page: string) => {
  const response = await fetch(`/api/post/list?page=${page}&limit=5`);
  const resData = await response.json();
  return resData.data;
};

export const addPost = async (data: { title: string; content: string }) => {
  const response = await fetch("/api/post/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData.data;
};

export const getPost = async (id: string) => {
  const response = await fetch(`/api/post/detail?id=${id}`);
  const resData = await response.json();
  return resData.data;
};
