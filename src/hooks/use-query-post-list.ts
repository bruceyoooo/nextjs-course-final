import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPostList } from "@/services/post";

const useQueryPostList = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getPostList(currentPage),
  });
};

export default useQueryPostList;
