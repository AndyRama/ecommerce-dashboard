interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin"
}

const varaintMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin"
}

