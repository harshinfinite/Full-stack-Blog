"use client";
import Link from "next/link";
import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  loading: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value }
    case "SET_ERROR":
      return { ...state, error: action.value }
    case "SET_LOADING":
      return { ...state, loading: action.value }
    default:
      return state
  }
};

export default function Signup() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "SET_ERROR", value: "" })

    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", value: "Passwords do not match" })
      return
    }

    dispatch({ type: "SET_LOADING", value: true })

    const response = await fetch("/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password
        })
      });

    const data = await response.json()

    if (!response.ok) {
      dispatch({ type: "SET_ERROR", value: data.error })
      dispatch({ type: "SET_LOADING", value: false })
      return
    };

    window.location.href = "/login"

  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-foreground opacity-70">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-hover transition-colors">
            Log in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background transition-colors"
                  placeholder="Jane Doe"
                  value={state.name}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background transition-colors"
                  placeholder="you@example.com"
                  value={state.email}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background transition-colors"
                  placeholder="••••••••"
                  value={state.password}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}

                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background transition-colors"
                  placeholder="••••••••"
                  value={state.confirmPassword}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "confirmPassword", value: e.target.value })}

                />
              </div>
            </div>

            <div>
              {state.error && (
                <p className="text-red-500 text-sm text-center mb-2">{state.error}</p>
              )}
              <button
                type="submit"
                disabled={state.loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
              >
                 {state.loading ? "Creating account..." : "Sign up"}
              </button>
            </div>

            <p className="text-xs text-center text-foreground opacity-60">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
