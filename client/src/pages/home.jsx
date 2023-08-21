import Status from "../components/home/Status"
import Posts from "../components/profile/Posts"

const Home = () => {
    return (
        <div className="grid mx-2 sm:grid-cols-12 sm:py-4">
            <div className="col-start-4 col-span-6">
                <Status />
                <Posts />
            </div>
        </div>
    )
}
export default Home