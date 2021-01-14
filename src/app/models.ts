export interface Ingredient {
    id: number,
    name: string,
    original: string,
    amount: number,
    unit: string
}

export interface Instructions {
    number: number,
    step: string,
}

export interface RecipeDetails {
    showDetails: boolean,
    category: string,
    plannedDate?: Date,
    veryHealthy?: boolean,
    veryPopular?: boolean,
    extendedIngredients?: Ingredient[],
    id: number,
    title: string,
    readyInMinutes: number,
    servings: number,
    image: string,
    summary: string,
    instructions: string,
    analyzedInstructions?: {
        name: string,
        steps: Instructions[]
    }[],
    spoonacularSourceUrl?: string,
}

export interface User {
    email: string,
    role: string,
    name?: string
}