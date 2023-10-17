import Status from "../components/home/Status"
import { useEffect, useState } from 'react'
import Posts from "../components/home/Posts"
import { useSelector } from "react-redux"
import Loading from "../components/alert/Loading"
import RightSideBar from "../components/home/RightSideBar"
import { useSuggestUserQuery } from "../redux/actions/userAction"

const Home = ({ user }) => {

    const { posts, postsLength } = useSelector((state) => state.homePost)

    const { users, refetch, isFetching } = useSuggestUserQuery({ id: user?._id })

    const [suggUser, setSuggUser] = useState([])
    const [homePost, setHomePost] = useState([])

    useEffect(() => {
        if (posts) setHomePost(posts)
    }, [posts])

    useEffect(() => {
        if (users) setSuggUser(users)
    }, [users])


    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4 ">
            <div className="sm:col-start-4 sm:col-span-6 ">
                <Status />

                {isFetching
                    ? <Loading />
                    : postsLength === 0
                        ? <h1>Follow other for more posts!</h1>
                        : <Posts posts={homePost} />
                }

            </div>

            <div className="sm:col-start-10 sm:col-span-3 ml-10">
                {!suggUser
                    ? <Loading />
                    : <RightSideBar refetch={refetch} />
                }
            </div>

        </div>
    )
}
export default Home