import { NextResponse } from "next/server";

const users: Record<string, string[]> = {};
const messages: Record<string, { sender: string; message: string }[]> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("room");

  if (!room) {
    return NextResponse.json({ error: "Room not provided" }, { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let isClosed = false;

      const interval = setInterval(() => {
        if (isClosed) return;

        try {
          const data = JSON.stringify({
            users: users[room] || [],
            messages: messages[room] || [],
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          clearInterval(interval);
          controller.close();
        }
      }, 1000);

      controller.close = () => {
        isClosed = true;
        clearInterval(interval);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  const { action, data } = await req.json();
  const { room, username, message } = data;

  if (action === "join") {
    if (!room || !username) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    users[room] = users[room] || [];
    if (!users[room].includes(username)) users[room].push(username);

    return NextResponse.json({ success: true });
  }

  if (action === "message") {
    if (!room || !username || !message) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    messages[room] = messages[room] || [];
    messages[room].push({ sender: username, message });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
