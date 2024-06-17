import { useQuery } from "react-query";
const useFilter = () => {
    const { date, isLoading, isError, refetch } = useQuery(
        "globalFilter",
        () => ({ searchTerm: "" }),
        {
            refetchOnWindowFocus: false,
        }
    );
    return { date, isLoading, isError, refetch };
}
export default useFilter;