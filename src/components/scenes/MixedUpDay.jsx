import React, { useEffect, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./MixedUpDay.module.css";

const text =
  "Then comes a mixed-up day, and WHAM! I don't know who or what I am.";

const pieces = [
  {
    id: "red",
    label: "Red",
    shape: "circle",
    home: { x: 18, y: 26 },
  },
  {
    id: "blue",
    label: "Blue",
    shape: "square",
    home: { x: 80, y: 26 },
  },
  {
    id: "green",
    label: "Green",
    shape: "leaf",
    home: { x: 30, y: 58 },
  },
  {
    id: "yellow",
    label: "Yellow",
    shape: "star",
    home: { x: 70, y: 58 },
  },
  {
    id: "purple",
    label: "Purple",
    shape: "pill",
    home: { x: 44, y: 82 },
  },
  {
    id: "orange",
    label: "Orange",
    shape: "diamond",
    home: { x: 56, y: 82 },
  },
];

const initialState = pieces.map((piece) => ({
  ...piece,
  offsetX: 0,
  offsetY: 0,
  isDragging: false,
  isColliding: false,
}));

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function distance(a, b) {
  const deltaX = a.x - b.x;
  const deltaY = a.y - b.y;
  return Math.hypot(deltaX, deltaY);
}

function homeToPixels(home, rect) {
  return {
    x: (home.x / 100) * rect.width,
    y: (home.y / 100) * rect.height,
  };
}

export default function MixedUpDay() {
  const [pieceState, setPieceState] = useState(initialState);
  const playAreaRef = useRef(null);
  const dragRef = useRef(null);
  const collisionTimersRef = useRef({});

  useEffect(() => {
    const timers = collisionTimersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const clearCollisionSoon = (ids) => {
    ids.forEach((id) => {
      const existingTimer = collisionTimersRef.current[id];
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }

      collisionTimersRef.current[id] = window.setTimeout(() => {
        setPieceState((current) =>
          current.map((piece) =>
            piece.id === id ? { ...piece, isColliding: false } : piece,
          ),
        );
        delete collisionTimersRef.current[id];
      }, 280);
    });
  };

  const handlePointerDown = (event, id) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    const targetPiece = pieceState.find((piece) => piece.id === id);
    if (!targetPiece) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: targetPiece.offsetX,
      startOffsetY: targetPiece.offsetY,
    };

    setPieceState((current) =>
      current.map((piece) =>
        piece.id === id ? { ...piece, isDragging: true, isColliding: false } : piece,
      ),
    );
  };

  const handlePointerMove = (event, id) => {
    const activeDrag = dragRef.current;
    const playArea = playAreaRef.current;

    if (!activeDrag || activeDrag.id !== id || activeDrag.pointerId !== event.pointerId || !playArea) {
      return;
    }

    const playAreaRect = playArea.getBoundingClientRect();
    const pieceRect = event.currentTarget.getBoundingClientRect();
    const definition = pieces.find((piece) => piece.id === id);

    if (!definition) {
      return;
    }

    const home = homeToPixels(definition.home, playAreaRect);
    const nextOffsetX = activeDrag.startOffsetX + (event.clientX - activeDrag.startX);
    const nextOffsetY = activeDrag.startOffsetY + (event.clientY - activeDrag.startY);
    const maxX = playAreaRect.width - pieceRect.width / 2 - 8;
    const maxY = playAreaRect.height - pieceRect.height / 2 - 8;
    const clampedCenterX = clamp(home.x + nextOffsetX, pieceRect.width / 2 + 8, maxX);
    const clampedCenterY = clamp(home.y + nextOffsetY, pieceRect.height / 2 + 8, maxY);

    setPieceState((current) =>
      current.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              offsetX: clampedCenterX - home.x,
              offsetY: clampedCenterY - home.y,
            }
          : piece,
      ),
    );
  };

  const endDrag = (event, id) => {
    const activeDrag = dragRef.current;
    const playArea = playAreaRef.current;

    if (!activeDrag || activeDrag.id !== id || activeDrag.pointerId !== event.pointerId || !playArea) {
      return;
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current = null;

    const playAreaRect = playArea.getBoundingClientRect();
    const releaseThreshold = Math.min(playAreaRect.width, playAreaRect.height) * 0.16;

    let collisionIds = [];

    setPieceState((current) => {
      const releasedPiece = current.find((piece) => piece.id === id);
      const definition = pieces.find((piece) => piece.id === id);

      if (!releasedPiece || !definition) {
        return current;
      }

      const home = homeToPixels(definition.home, playAreaRect);
      const currentCenter = {
        x: home.x + releasedPiece.offsetX,
        y: home.y + releasedPiece.offsetY,
      };

      const wrongHome = pieces
        .filter((piece) => piece.id !== id)
        .map((piece) => ({
          id: piece.id,
          distance: distance(currentCenter, homeToPixels(piece.home, playAreaRect)),
        }))
        .sort((left, right) => left.distance - right.distance)[0];

      if (wrongHome && wrongHome.distance <= releaseThreshold) {
        collisionIds = [id, wrongHome.id];
      }

      return current.map((piece) => ({
        ...piece,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        isColliding: collisionIds.includes(piece.id),
      }));
    });

    if (collisionIds.length > 0) {
      clearCollisionSoon(collisionIds);
    }
  };

  const cancelDrag = (event, id) => {
    const activeDrag = dragRef.current;

    if (!activeDrag || activeDrag.id !== id || activeDrag.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;

    setPieceState((current) =>
      current.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              offsetX: 0,
              offsetY: 0,
              isDragging: false,
              isColliding: false,
            }
          : piece,
      ),
    );
  };

  return (
    <Page backgroundColor="#E0E0E0">
      <div className={styles.scene}>
        <div className={styles.textWrap}>
          <AnimatedText text={text} style={{ color: "#111" }} className={styles.titleText} />
        </div>
        <div ref={playAreaRef} className={styles.playArea}>
          {pieceState.map((piece, index) => (
            <button
              key={piece.id}
              type="button"
              className={[
                styles.shape,
                styles[piece.id],
                styles[piece.shape],
                piece.isDragging ? styles.dragging : "",
                piece.isColliding ? styles.colliding : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                "--home-x": `${piece.home.x}%`,
                "--home-y": `${piece.home.y}%`,
                "--offset-x": `${piece.offsetX}px`,
                "--offset-y": `${piece.offsetY}px`,
                animationDelay: `${1 + index * 0.1}s`,
              }}
              onPointerDown={(event) => handlePointerDown(event, piece.id)}
              onPointerMove={(event) => handlePointerMove(event, piece.id)}
              onPointerUp={(event) => endDrag(event, piece.id)}
              onPointerCancel={(event) => cancelDrag(event, piece.id)}
              onLostPointerCapture={(event) => cancelDrag(event, piece.id)}
              aria-label={`Move the ${piece.label.toLowerCase()} shape`}
            >
              <span className={styles.surface}>
                <span className={styles.label}>{piece.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </Page>
  );
}
