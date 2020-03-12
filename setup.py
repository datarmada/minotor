import setuptools
setuptools.setup(
    name="minotoring",
    version="0.0.0",
    author="Datarmada",
    author_email="contact@datarmada.com",
    description="Easy to use ML and plug and play monitoring tool.",
    url="https://github.com/borisghidaglia/minotoring",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    install_requires=[
        "flask>=1.1.1",
    ],
    include_package_data=True,
    entry_points={
        'console_scripts': ['minotoring=minotoring.run:runserver'],
    },
)
