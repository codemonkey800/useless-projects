#### Introduction
Computer Science is all about solving problems using algorithms, so it makes sense for
schools to give challenging problems to their students relative to their skill level.

Not at Berkeley, however. At Berkeley, the goal is to torture students with problems
they can't possibly do at their skill level, especially in Computer Science. Nevertheless,
one of my friends at Berkeley came to me yesterday for help on one of her problems for her
CS quiz, and let me tell you, *this problem is too hard for an intro course.*

#### The Problem
The problem statement is:

> Complete the implementation of `pi_fraction`, which takes a positive number `gap` and prints
> the fraction that is no more than `gap` away from `pi` and has the smallest possible
> integer denominator. See the doctests for the format of the printed output.
>
> *Hint*: If you want to find the nearest integer to a number, use the built-in `round` function.
> It's possible to solve this problem without using `round`.
>
> You may change the starter implementation if you wish.
>
> ```py
> from math import pi
> 
> def pi_fraction( gap ):
>     """Print the fraction within gap of pi that has the smallest denominator.
> 
>     >>> pi_fraction( 0.01 )
>     22 / 7 = 3.142857142857143
>     >>> pi_fraction( 1 )
>     3 / 1 = 3.0
>     >>> pi_fraction( 1/8 )
>     13 / 4 = 3.25
>     >>> pi_fraction( 1e-6 )
>     355 / 113 = 3.1415929203539825
> 
> 
>     """
>     numerator, denominator = 3, 1
>     "*** YOUR CODE HERE ***"
>     print( numerator, '/', denominator, '=', numerator/denominator )
> ```

First off, Berkeley, **why the fuck are you asking students new to Computer Science 
this question. It's way too hard for them.**

With that out of the way, approaching this problem (Well at least for me) is pretty difficult.
How the hell do we even come up with *approximately equal* rational representations of 
\\( \pi \\)?

While I'm not sure of an efficient solution, I am pretty darn good at brute forcing, so let's
try that.

#### Brute Force is the Way To Go!
At first glance, a brute force algorithm seems the simplest way to approach this problem.
Before we dive into the code, let's dive into the core solution.

Our approach is to check the set of denominators
\\[
    D := \left\\{ d : d \leq  \left\lfloor \frac{\text{numerator}}{3} \right\rfloor - 1 \right\\},
\\]
for each increment of `numerator`, and whether or not for some \\( d \in D \\)
\\[
    \left| \pi - \frac{\text{numerator}}{d} \right| \leq \text{gap}.
\\]

The reason why we check for 
\\[
    d \leq  \left\lfloor \frac{\text{numerator}}{3} \right\rfloor - 1
\\]
is because \\( \left\lfloor \pi \right\rfloor = 3 \\), so it would make sense to only check
the denominators where the division results in at least \\( 3 \\). Checking for all
\\( d \leq \text{denominators} - 1 \\) would be slightly more inefficient. And although the division 
doesn't affect the running time, it's nice to have small optimizations.

#### Implementing the Algorithm
Finally! Let's write some code!

```py
def pi_fraction( gap ):
    """Print the fraction within gap of pi that has the smallest denominator.

    >>> pi_fraction( 0.01 )
    22 / 7 = 3.142857142857143
    >>> pi_fraction( 1 )
    3 / 1 = 3.0
    >>> pi_fraction( 1/8 )
    13 / 4 = 3.25
    >>> pi_fraction( 1e-6 )
    355 / 113 = 3.1415929203539825


    """
    numerator, denominator = 3, 1

    while True:
        denominator = 1

        for i in range( numerator // 3 ):

            if abs( pi - numerator / denominator ) <= gap:
                print( numerator, '/', denominator, '=', numerator/denominator )
                return

            denominator += 1

        numerator += 1
```

Let's examine the code. We set up a `while` loop because infinite `while` loops are awesome.
I agree, it may be bad coding practice, but it works for all inputs in the Python docs.

For each iteration of the while loop, we set `numerator = 1` and then check up to
`numerator // 3` denominators. Within the  `for` loop, we check if 
\\( \left| \pi - \frac{d}{n} \right| \leq \text{gap} \\), and print the formatted string otherwise. 
We return the function to it's caller as well. Otherwise, we increment `denominator` by 
\\( 1 \\). Exiting the for loop, we increment `numerator` by \\( 1 \\) and restart the process.

This is a really *bad* algorithm, but it works for all provided cases in the documents. The algorithm 
typically increases a whole lot in running time when \\( \text{gap} \leq 10^{-7} \\), so hopefully Berkeley
doesn't check for values that small.


#### Conclusion
And there you have it. My solution to this absurdly difficult problem. If you have any more efficient solutions,
definitely leave it in the comment or message me. I'd love to provide your solution as an edit in my post.

Also, please stop torturing your students Berkeley. 