import { Box, Button, Container, Flex, Heading, IconButton, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { FaTimes, FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Order Issue", messages: ["Can you update my order status?", "Your order is on the way!"], closed: false },
    { id: 2, title: "Product Inquiry", messages: ["Do you have this product in stock?", "Yes, we do have it in stock."], closed: true },
  ]);
  const [activeConversationId, setActiveConversationId] = useState(conversations[0].id);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === activeConversationId) {
        let updatedTitle = conversation.title;
        if (conversation.title === "New Conversation" && conversation.messages.length === 0) {
          if (message.toLowerCase().includes("order")) {
            updatedTitle = "Order Inquiry";
          } else if (message.toLowerCase().includes("payment")) {
            updatedTitle = "Payment Issue";
          } else {
            updatedTitle = "General Inquiry";
          }
        }
        return { ...conversation, title: updatedTitle, messages: [...conversation.messages, message] };
      }
      return conversation;
    });
    setConversations(updatedConversations);
    setMessage("");
  };

  const handleMarkAsClosed = (id) => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === id) {
        return { ...conversation, closed: true };
      }
      return conversation;
    });
    setConversations(updatedConversations);
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId);

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading>Chat Interface</Heading>
        <Flex>
          {conversations.map((conversation, index) => (
            <Button key={conversation.id} onClick={() => handleSelectConversation(conversation.id)} colorScheme={conversation.id === activeConversationId ? "blue" : "gray"}>
              {conversation.title} {conversation.closed ? "(Closed)" : ""}
            </Button>
          ))}
          <Button
            colorScheme="teal"
            onClick={() => {
              const newConversation = {
                id: Math.max(...conversations.map((c) => c.id)) + 1,
                title: "New Conversation",
                messages: [],
                closed: false,
              };
              setConversations([...conversations, newConversation]);
              setActiveConversationId(newConversation.id);
            }}
          >
            New Conversation
          </Button>
        </Flex>
        <Box p={4} border="1px" borderColor="gray.200">
          <VStack spacing={4} align="stretch">
            <Heading size="md">{activeConversation.title}</Heading>
            <Stack spacing={3}>
              {activeConversation.messages.map((msg, index) => (
                <Flex key={index} justify={index % 2 === 0 ? "flex-start" : "flex-end"}>
                  <Box bg={activeConversation.closed ? "red.100" : "blue.100"} p={2} borderRadius="lg">
                    <Text fontSize="xs" color="gray.500">
                      {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </Text>
                    <Text>{msg}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {index % 2 === 0 ? "Customer" : "Service"}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
            <Flex>
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
              <IconButton aria-label="Send" icon={<FaArrowRight />} onClick={handleSendMessage} />
            </Flex>
            {!activeConversation.closed && (
              <Button leftIcon={<FaCheck />} colorScheme="green" onClick={() => handleMarkAsClosed(activeConversation.id)}>
                Mark as Closed
              </Button>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
