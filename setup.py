import setuptools
setuptools.setup(
    name="minotor",
    version="0.0.2",
    author="Datarmada",
    author_email="contact@datarmada.com",
    description="Easy to use plug and play ML monitoring tool.",
    url="https://github.com/datarmada/minotor",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.7',
    install_requires=[
        "requests>=2.23.0",
        "numpy>=1.18.1",
        "pandas>=1.0.1",
        "tornado>=6.0.4",
        "scikit-learn>=0.22.2",
        "scipy>=1.4.1",
        "wheel>=0.34.2",
    ],
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'minotor=minotor.command:main',
        ],
    },
)
