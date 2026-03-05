"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Shield, Delete, Sparkles } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"] as const
const PIN_LENGTH = 4

function PinForm() {
    const searchParams = useSearchParams()
    const from = searchParams.get("from") ?? "/admin/dashboard"
    const error = searchParams.get("error") === "1"

    const [pin, setPin] = useState("")
    const [shake, setShake] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (error && pin.length === 0) {
            setShake(true)
            setTimeout(() => setShake(false), 600)
        }
    }, [error, pin.length])

    useEffect(() => {
        if (pin.length === PIN_LENGTH) {
            setSubmitting(true)
            const form = document.getElementById("pin-form") as HTMLFormElement
            form?.submit()
        }
    }, [pin])

    function press(key: typeof KEYS[number]) {
        if (key === "del") {
            setPin((p) => p.slice(0, -1))
        } else if (key !== "" && pin.length < PIN_LENGTH && !submitting) {
            setPin((p) => p + key)
        }
    }

    return (
        <div style={{ width: "100%" }}>
            {/* Indicadores de dígitos */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    marginBottom: "32px",
                    animation: shake ? "shake 0.4s ease" : undefined,
                }}
            >
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: i < pin.length ? "oklch(0.75 0.18 55)" : "rgba(255,255,255,0.2)",
                            backgroundColor: i < pin.length ? "oklch(0.75 0.18 55)" : "transparent",
                            transform: i < pin.length ? "scale(1.15)" : "scale(1)",
                            boxShadow: i < pin.length ? "0 0 12px oklch(0.75 0.18 55 / 0.6)" : "none",
                            transition: "all 0.2s ease",
                        }}
                    />
                ))}
            </div>

            {/* Error */}
            {error && pin.length === 0 && (
                <p style={{ textAlign: "center", color: "#f87171", fontSize: "14px", marginBottom: "16px" }}>
                    PIN incorrecto. Intentá de nuevo.
                </p>
            )}

            {/* Form oculto */}
            <form id="pin-form" method="POST" action="/api/admin/login">
                <input type="hidden" name="pin" value={pin} readOnly />
                <input type="hidden" name="from" value={from} readOnly />
            </form>

            {/* Teclado */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {KEYS.map((key, idx) => {
                    if (key === "") return <div key={idx} />

                    if (key === "del") {
                        return (
                            <button
                                key="del"
                                type="button"
                                onClick={() => press("del")}
                                disabled={submitting || pin.length === 0}
                                style={{
                                    height: "64px",
                                    borderRadius: "16px",
                                    border: "none",
                                    background: "transparent",
                                    cursor: pin.length === 0 || submitting ? "default" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: pin.length === 0 || submitting ? 0.25 : 1,
                                    transition: "all 0.15s ease",
                                }}
                            >
                                <Delete style={{ width: "20px", height: "20px", color: "rgba(255,255,255,0.7)" }} />
                            </button>
                        )
                    }

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => press(key)}
                            disabled={submitting || pin.length >= PIN_LENGTH}
                            style={{
                                height: "64px",
                                borderRadius: "16px",
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "oklch(0.19 0.012 255)",
                                color: "rgba(255,255,255,0.95)",
                                fontSize: "22px",
                                fontWeight: "600",
                                cursor: submitting ? "default" : "pointer",
                                opacity: submitting ? 0.5 : 1,
                                transition: "all 0.15s ease",
                                fontFamily: "inherit",
                            }}
                            onMouseEnter={(e) => {
                                if (!submitting) {
                                    (e.target as HTMLButtonElement).style.background = "oklch(0.22 0.011 255)"
                                        ; (e.target as HTMLButtonElement).style.borderColor = "oklch(0.75 0.18 55 / 0.4)"
                                }
                            }}
                            onMouseLeave={(e) => {
                                ; (e.target as HTMLButtonElement).style.background = "oklch(0.19 0.012 255)"
                                    ; (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"
                            }}
                        >
                            {key}
                        </button>
                    )
                })}
            </div>

            {submitting && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                    <span
                        style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.2)",
                            borderTopColor: "oklch(0.75 0.18 55)",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 0.7s linear infinite",
                        }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Verificando…</span>
                </div>
            )}
        </div>
    )
}

export default function AdminLoginPage() {
    return (
        <div
            style={{
                minHeight: "100dvh",
                background: "oklch(0.12 0.015 255)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "var(--font-sans, system-ui, sans-serif)",
            }}
        >
            {/* Blobs decorativos */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    width: "384px",
                    height: "384px",
                    background: "oklch(0.75 0.18 55 / 0.06)",
                    borderRadius: "50%",
                    filter: "blur(120px)",
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "25%",
                    width: "256px",
                    height: "256px",
                    background: "oklch(0.68 0.16 250 / 0.05)",
                    borderRadius: "50%",
                    filter: "blur(100px)",
                    pointerEvents: "none",
                }}
            />

            {/* Contenido */}
            <div style={{ position: "relative", width: "100%", maxWidth: "280px" }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            width: "64px",
                            height: "64px",
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, oklch(0.75 0.18 55), oklch(0.65 0.18 55 / 0.7))",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "16px",
                            boxShadow: "0 0 40px -8px oklch(0.75 0.18 55 / 0.6)",
                        }}
                    >
                        <Shield style={{ width: "32px", height: "32px", color: "white" }} />
                    </div>
                    <h1 style={{ fontSize: "20px", fontWeight: "700", color: "white", margin: "0 0 4px" }}>
                        Panel Admin
                    </h1>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                        Ingresá tu PIN de 4 dígitos
                    </p>
                </div>

                {/* PIN Form */}
                <Suspense
                    fallback={
                        <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
                            <span
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "2px solid rgba(255,255,255,0.15)",
                                    borderTopColor: "oklch(0.75 0.18 55)",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    animation: "spin 0.7s linear infinite",
                                }}
                            />
                        </div>
                    }
                >
                    <PinForm />
                </Suspense>

                {/* Volver al sitio */}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.2)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                    >
                        <Sparkles style={{ width: "12px", height: "12px" }} />
                        Volver al sitio
                    </Link>
                </div>
            </div>

            {/* Keyframes globales inline */}
            <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }
      `}</style>
        </div>
    )
}
