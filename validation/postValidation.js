export const validatePostInfo = (postInfo) => {
  const  {
    postType,
    category,
    postTitle,
    anonymousType,
    worryContents
  } = postInfo;

  if (
    !postType ||
    !category ||
    !postTitle ||
    !anonymousType ||
    !worryContents
  ) {
    return "누락된 정보가 있습니다";
  }

  if (postTitle.length < 5) {
    return "제목은 5글자 이상 부탁드립니다";
  }

  if (worryContents.length < 10) {
    return "본문 내용은 10글자 이상 부탁드립니다";
  }
};
