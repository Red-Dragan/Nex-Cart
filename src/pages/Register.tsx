import React from "react";
import { Form, Link, useNavigation, useActionData } from "react-router";
import styles from "../styles/Auth.module.css";

const SignUp: React.FC = () => {
  const navigation = useNavigation(); // Fixed: navigateion → navigation
  const actionData = useActionData() as
    | { errors?: Record<string, string> } // Fixed: error → errors
    | undefined;
  const isSubmitting = navigation.state === "submitting";

  const errors = actionData?.errors || {}; // Fixed: error → errors

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Header */}
        <div className={styles.authHeader}>
          <h1>Create Account</h1>
          <p>Sign up to start shopping</p>
        </div>

        {/* Form */}
        <Form method="post" className={styles.authForm}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={errors.name ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
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

          {/* Confirm Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={errors.confirmPassword ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>{errors.confirmPassword}</p>
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
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </Form>

        {/* Footer */}
        <div className={styles.authFooter}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
