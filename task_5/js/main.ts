export interface MajorCredits {
    readonly __brand: MajorCredits;
    credits: number;
       
}

export interface MinorCredits {
    readonly __brand: MinorCredits;
    credits: number;
    sumMinorCredits(subject1: number, subject2: number): MinorCredits;
}

export function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    const totalCredits = subject1.credits + subject2.credits;
    return {credits: totalCredits} as MajorCredits;
}

export function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    const totalCredits = subject1.credits + subject2.credits;
    return {credits: totalCredits} as MinorCredits;
}