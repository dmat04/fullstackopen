const Notification = ({ messageObject }) => {
    if (messageObject === null || messageObject.message === null) {
        return null
    }

    return (
        <div className={messageObject.className}>
            {messageObject.message}
        </div>
    )
}

export default Notification