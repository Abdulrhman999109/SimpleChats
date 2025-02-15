const ChatMessage = ({ message }: { message: any }) => {
  return (
    <div className="p-3 mb-3 bg-gray-900 text-yellow-50 rounded-lg shadow-sm">
      <strong className="text-yellow-300">{message.users.username}:</strong>
      <span className="text-yellow-50"> {message.content}</span>
    </div>
  );
};

export default ChatMessage;
