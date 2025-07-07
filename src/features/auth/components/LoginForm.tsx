import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { LoginSchemaDTO } from "@/schemas/auth.schema";
import { Link } from "@tanstack/react-router";
import type { Control, FieldPath } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const { loginForm, isPending, onSubmit } = useLogin();

  interface LoginFormFieldProps {
    name: FieldPath<LoginSchemaDTO>;
    placeholder: string;
    inputType?: string;
    formControl: Control<LoginSchemaDTO, any>;
  }

  const LoginFormField: React.FC<LoginFormFieldProps> = ({
    name,
    placeholder,
    inputType,
    formControl,
  }) => {
    return (
      <div className="w-full">
        <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={inputType || "text"}
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <LoginFormField
            name="email"
            placeholder="email"
            inputType="email"
            formControl={loginForm.control}
          />
          <LoginFormField
            name="password"
            placeholder="password"
            inputType="password"
            formControl={loginForm.control}
          />
          <div className="text-right">
            <Link
              to="/password/forgot"
              className="text-xs text-muted-foreground hover:text-muted-foreground/70"
            >
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full text-secondary">
            {isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner size={"small"} />
                Loading...
              </span>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
