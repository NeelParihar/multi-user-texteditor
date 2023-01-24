import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { io, Socket } from "socket.io-client";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";

const SAVE_INTERVAL = 3000;

function TextEditor() {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();

  useEffect(() => {
    const s = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  /**
   * use Effect for getting previously saved data
   */
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-text", (text) => {
      quill.setContents(text);
      quill.enable();
    });

    socket.emit("get-text");
  }, [socket, quill]);

  /**
   * use Effect for saving data in intervals of 3 second
   */
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-text", quill.getContents());
    }, SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  /**
   * use Effect for receiving any changes done by different users
   */
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  /**
   * use Effect for sending changes done using quill
   */
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  /**
   * use Effect for sending changes done using quill
   */
  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: null },
    });
    setQuill(q);
  }, []);

  return (
    <>
      <h3>Type and share anything you want below</h3>
      <div ref={wrapperRef} className="ql-container"></div>
    </>
  );
}

export default TextEditor;
