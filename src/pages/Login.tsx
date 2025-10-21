import React from "react";
import { Form, Link, useNavigation, useActionData } from "react-router";
import styles from "../styles/Auth.module.css";

const Login: React.FC = () => {
  const navigation = useNavigation();
  const actionData = useActionData() as
    | { errors?: Record<string, string> }
    | undefined;

  const isSubmitting = navigation.state === "submitting";
  const errors = actionData?.errors || {};

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Header */}
        <div className={styles.authHeader}>
          <h1>Welcome Back</h1>
          <p>Welcome to your account</p>
        </div>

        {/* Form */}
        <Form method="post" className={styles.authForm}>
          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={errors.email ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={errors.password ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className={styles.submitError}>
              <p>{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </Form>

        {/* Footer */}
        <div className={styles.authFooter}>
          <p>
            Don't have an account?{" "}
            <Link to="/Register" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
