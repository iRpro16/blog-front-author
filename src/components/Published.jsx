const Published = ({ isPublished }) => {
    if (isPublished) {
        return (
            <div className="published bg-blue-300 rounded-md p-2">
                Published
            </div>
        )
    }
    return (
        <div className="not-published bg-orange-300 rounded-md p-2">
            Not Published
        </div>
    )
}

export default Published;