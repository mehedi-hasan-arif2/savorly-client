export interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Recipe {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  images: string[];
  rating: number;
  reviews: Review[];
  createdBy: string;
  createdAt: string;
}

export interface AuthUser {
  userId: string;
  email: string;
  name: string;
  role: "user" | "admin";
}
